import {Router} from 'express'
import db from '../helpers/database'
import {verifyToken} from '../helpers/middleware'

const router = Router()

router.post('/get_flights', async (req, res) => {

    const {from, to, returnFlight, departureDate, returnDate} = req.body

    let departingFlights = []
    let returnFlights = []

    try {
        // const sqlDepartureDate = new Date(departureDate).toISOString().slice(0, 19).replace('T', ' ')
        const fetchString = `SELECT * FROM flights 
            WHERE DATE(departure_date) = DATE('${departureDate}')
            AND departure = '${from}' AND arrival = '${to}' ORDER BY departure_date ASC 
        `
        const rows = await db.query(fetchString)
        if (rows.length > 0) {
            departingFlights = rows
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'COULD NOT FETCH FLIGHTS FROM THE DATABASE', status: 500})
    }

    if (returnFlight) {
        try {
            // const sqlReturnDate = new Date(returnDate).toISOString().slice(0, 19).replace('T', ' ')
            const fetchString = `SELECT * FROM flights 
            WHERE DATE(departure_date) = DATE('${returnDate}')
            AND departure = '${to}' AND arrival = '${from}'   
        `
            const rows = await db.query(fetchString)
            if (rows.length > 0) {
                returnFlights = rows
            }
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'COULD NOT FETCH RETURN FLIGHTS FROM THE DATABASE', status: 500})
        }
    }

    res.send({departingFlights, returnFlights, returnFlightResults: returnFlight})
})

router.post('/get_seats', async (req, res) => {

    if (req.body.double_flight) {

        const queryFirstSeats = `SELECT seat_row, seat_number FROM reservations WHERE flight_id = ${req.body.firstFlight}`
        const queryFirstFlight = `SELECT seat_number, seat_rows FROM flights WHERE id = ${req.body.firstFlight} LIMIT 1`

        const querySecondSeats = `SELECT seat_row, seat_number FROM reservations WHERE flight_id = ${req.body.secondFlight}`
        const querySecondFlight = `SELECT seat_number, seat_rows FROM flights WHERE id = ${req.body.secondFlight} LIMIT 1`

        try {
            const firstSeatRows = await db.query(queryFirstSeats)
            const firstFlightRows = await db.query(queryFirstFlight)

            const secondSeatRows = await db.query(querySecondSeats)
            const secondFlightRows = await db.query(querySecondFlight)

            const firstSeats = getSeats({seatNumber: firstFlightRows[0].seat_number, seatRows: firstFlightRows[0].seat_rows, takenSeats: firstSeatRows})
            const secondSeats = getSeats({seatNumber: secondFlightRows[0].seat_number, seatRows: secondFlightRows[0].seat_rows, takenSeats: secondSeatRows})

            res.send({firstSeats, secondSeats})
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'COULD NOT FETCH SEATS FROM THE DATABASE', status: 500})
        }

    } else {

        const {id} = req.body

        const querySeats = `SELECT seat_row, seat_number FROM reservations WHERE flight_id = ${id}`
        const queryFlight = `SELECT seat_number, seat_rows FROM flights WHERE id = ${id} LIMIT 1`

        try {
            const seatRows = await db.query(querySeats)
            const flightRows = await db.query(queryFlight)

            const seats = getSeats({seatNumber: flightRows[0].seat_number, seatRows: flightRows[0].seat_rows, takenSeats: seatRows})

            res.send(seats)
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'COULD NOT FETCH SEATS FROM THE DATABASE', status: 500})
        }
    }

})

router.post('/book_flights', async (req, res) => {

    const {firstFlightData, returnFlightData, double_flight} = req.body

    if (double_flight) {
        try {
            const insertFirstReservation = `
                INSERT INTO reservations (flight_id, customer_id, seat_number, seat_row, insurance, meals, total_price, class)
                VALUES (${firstFlightData.flight_id}, ${firstFlightData.customer_id}, ${firstFlightData.seat_number}, ${firstFlightData.seat_row}, ${firstFlightData.insurance}, ${firstFlightData.meals}, ${firstFlightData.total_price}, ${firstFlightData.flightClass})
        `
            const insertSecondReservation = `
                INSERT INTO reservations (flight_id, customer_id, seat_number, seat_row, insurance, meals, total_price, class)
                VALUES (${returnFlightData.flight_id}, ${returnFlightData.customer_id}, ${returnFlightData.seat_number}, ${returnFlightData.seat_row}, ${returnFlightData.insurance}, ${returnFlightData.meals}, ${returnFlightData.total_price}, ${returnFlightData.flightClass})
        `
            await db.query(insertFirstReservation)
            await db.query(insertSecondReservation)
            res.send('OK')
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'COULD NOT ADD RESERVATION TO THE DATABASE', status: 500})
        }
    } else {

        let {flight_id,
            customer_id,
            seat_number,
            seat_row,
            insurance,
            meals,
            total_price,
            flightClass
        } = firstFlightData

        try {
            const insertSingleReservation = `
            INSERT INTO reservations (flight_id, customer_id, seat_number, seat_row, insurance, meals, total_price, class)
            VALUES (${flight_id}, ${customer_id}, ${seat_number}, ${seat_row}, ${insurance}, ${meals}, ${total_price}, ${flightClass})
        `
            await db.query(insertSingleReservation)
            res.send('OK')
        } catch (err) {
            console.log(err)
            res.status(500).json({error: 'COULD NOT ADD RESERVATION TO THE DATABASE', status: 500})
        }
    }
})

router.get('/recent_flights', verifyToken, async (req, res) => {
    const userId = res.locals.id
    const selectRecentFlights = `SELECT flights.departure, flights.arrival FROM reservations INNER JOIN flights ON reservations.flight_id = flights.id WHERE reservations.customer_id = ${userId} ORDER BY flights.departure DESC LIMIT 5`
    try {
        const rows = await db.query(selectRecentFlights)
        res.send(rows)
    } catch (err) {
        res.status(500).json({error: 'COULD NOT FETCH RECENT DESTINATION FROM THE DATABASE', status: 500})
    }
})

const getSeats = ({seatNumber, seatRows, takenSeats}) => {

    const seatLetters = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h', 9: 'i'}
    const seats = {}

    for (let i = 1; i <= seatNumber; i++) {
        for (let j = 1; j <= seatRows; j++) {
            const seat = {}
            seat[seatLetters[j]] = false
            seats[i] = {...seats[i], ...seat}
        }
    }

    takenSeats.map(takenSeat => {
        seats[takenSeat.seat_number][seatLetters[takenSeat.seat_row]] = true
    })

    return seats
}

export default router