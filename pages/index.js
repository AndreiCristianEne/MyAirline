import '../styles/base.sass'

import React, {Component} from 'react'

// navbar
import Navbar from '../components/Navbar'

//search flight
import SearchFlightForm from '../components/SearchFlightForm'

//flight results
import FlightResults from '../components/FlightResults'

//book flight form
import BookFlightForm from '../components/BookFlightForm'

export default class extends Component {

    static async getInitialProps({axios, redirect}) {

        let user = null
        let cities = null
        let recentCities = null

        try {
            const userResponse = await axios.get('/api/user/get_user')
            user = userResponse.data

        } catch (err) {
            redirect('/login')
        }

        try {
            const citiesResponse = await axios.get('/api/cities/get_cities')
            cities = citiesResponse.data
        } catch (err) {
            throw new Error()
        }

        try {
            const recentCitiesResponse = await axios.get('/api/flights/recent_flights')
            recentCities = recentCitiesResponse.data
        } catch (err) {
            console.log(err)
        }

        return {
            user,
            cities,
            recentCities
        }
    }

    constructor(props) {
        super(props)
        this.state = {
            from: 0, fromTouched: false,
            to: 0, toTouched: false,
            departureDate: '', departureDateTouched: false,
            returnDate: '', returnDateTouched: false,
            returnFlight: true,
            searchingFlights: false,
            departingFlights: [],
            returnFlights: [],
            returnFlightResults: false,
            activeFlight: null,
            activeReturnFlight: null,
            seats: {},
            returnSeats: {}
        }
    }

    render() {
        const {user, cities, recentCities} = this.props
        const {passport_name} = user
        const {
            from, fromTouched,
            to, toTouched,
            departureDate, departureDateTouched,
            returnDate, returnDateTouched,
            returnFlight,
            searchingFlights,
            departingFlights, returnFlights, returnFlightResults,
            activeFlight, activeReturnFlight, seats, returnSeats
        } = this.state
        const errors = this.getErrors()

        return (
            <div>
                <Navbar userName={passport_name}/>
                <div className="section">
                    {
                        activeFlight
                            ? <BookFlightForm {...{activeFlight, activeReturnFlight, seats, returnSeats}}
                                              cancel={() => this.setState({
                                                  activeFlight: null,
                                                  activeReturnFlight: null
                                              })}
                                              book={(flight) => this.bookFlight(flight)}
                            />
                            : ''
                    }
                    <div className="container">
                        <div className="columns">
                            <div className="column is-8">
                                <SearchFlightForm
                                    {...{
                                        from, fromTouched,
                                        to, toTouched,
                                        departureDate, departureDateTouched,
                                        returnDate, returnDateTouched,
                                        returnFlight,
                                        cities,
                                        errors,
                                        searchingFlights
                                    }}
                                    changedInput={(state) => this.setState({...state})}
                                    touched={(state) => this.setState({...state})}
                                    searchFlights={() => this.searchFlights()}
                                />
                                <br/>
                                <div className="content">
                                    <p>
                                        <small><strong>Tip</strong>: remember to use the <strong>Quick Book</strong>
                                            &nbsp; option
                                            to save time and effort.
                                        </small>
                                    </p>
                                </div>
                                <hr/>
                                <FlightResults {...{departingFlights, returnFlights, returnFlightResults}}
                                               quickBook={(flight) => this.quickBookFlight(flight)}/>
                            </div>
                            <div className="column is-3 is-offset-1 is-bordered-left">
                                <div className="">
                                    <div className="content">
                                        <h2>R
                                            <small>ecent flights</small>
                                        </h2>
                                        <hr/>
                                    </div>
                                    {recentCities.map((destination, key) => {
                                        return (
                                            <div className="content" key={key}>
                                                <h2><a onClick={() => this.setState({
                                                    from: destination.departure,
                                                    to: destination.arrival
                                                })}>
                                                    <small>{destination.departure}</small>
                                                    &nbsp;&nbsp;
                                                    <small>to</small>
                                                    &nbsp;&nbsp;
                                                    <small>{destination.arrival}</small>
                                                </a></h2>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    getErrors() {
        let errors = {}
        const {from, to, departureDate, returnDate, returnFlight} = this.state

        if (from === 0) {
            errors = {...errors, from: 'Invalid departure city'}
        }

        if (to === 0 || to === from) {
            errors = {...errors, to: 'Invalid departure city'}
        }

        if (departureDate === '' || departureDate === null) {
            errors = {...errors, departureDate: 'Invalid departure date'}
        }

        if (returnFlight && (returnDate === '' || returnDate === null)) {
            errors = {...errors, returnDate: 'Invalid return date'}
        }

        return errors
    }

    async searchFlights() {
        const {
            from,
            to,
            departureDate,
            returnDate,
            returnFlight
        } = this.state

        departureDate.setHours(10)
        let actualDepartureDate = departureDate.toISOString()
        let actualReturnDate = null

        if (returnDate) {
            returnDate.setHours(10)
            actualReturnDate = returnDate.toISOString()
        }

        try {
            this.setState({searchingFlights: true})
            const {data} = await this.props.axios.post('/api/flights/get_flights', {
                from,
                to,
                departureDate: actualDepartureDate,
                returnDate: actualReturnDate,
                returnFlight
            })
            this.setState({...data})
            this.setState({searchingFlights: false})
            if (data.departingFlights.length === 0) {
                this.props.showAlert({
                    title: 'No available flights',
                    text: 'Unfortunately, there are no available flights. Please try different dates.'
                })
            }
            if (data.returnFlightResults && data.returnFlights.length === 0) {
                this.props.showAlert({
                    title: 'No available return flights',
                    text: 'Unfortunately, there are no available return flights! Please try different dates or search for a single ticket.'
                })
            }
        } catch (err) {
            console.log(err)
        }
    }

    async quickBookFlight(flight) {

        if (this.state.returnFlightResults) {
            try {
                const {data} = await this.props.axios.post('/api/flights/get_seats', {
                    firstFlight: flight.departingFlight.id,
                    secondFlight: flight.returnFlight.id,
                    double_flight: true
                })
                this.setState({
                    activeFlight: flight.departingFlight,
                    activeReturnFlight: flight.returnFlight,
                    seats: data.firstSeats,
                    returnSeats: data.secondSeats
                })
            } catch (err) {
                console.log(err)
                this.props.showAlert({
                    title: 'Failed fetching flight details',
                    text: 'We could not retrieve the flight\'s details. Please refresh and try again!'
                })
            }
        } else {
            try {
                const {data} = await this.props.axios.post('/api/flights/get_seats', {
                    id: flight.id,
                    double_flight: false
                })
                this.setState({activeFlight: flight, seats: data})
            } catch (err) {
                console.log(err)
                this.props.showAlert({
                    title: 'Failed fetching flight details',
                    text: 'We could not retrieve the flight\'s details. Please refresh and try again!'
                })
            }
        }
    }

    async bookFlight(flight) {
        const {activeFlight, activeReturnFlight} = this.state
        const {user} = this.props

        const seats = {a: 1, b: 2, c: 3, d: 4, e: 5, f: 6, g: 7, h: 8, i: 9}

        const {firstFlightResponse, returnFlightResponse, total} = flight

        if (activeReturnFlight) {

            let firstFlightTotal

            if (firstFlightResponse.class === 1) {
                firstFlightTotal = activeFlight.first_class
            } else {
                firstFlightTotal = activeFlight.base_price
            }

            if (firstFlightResponse.meals) {
                firstFlightTotal += activeFlight.meals_price
            }

            if (firstFlightResponse.insurance) {
                firstFlightTotal += activeFlight.insurance_price
            }

            let returnFlightTotal

            if (returnFlightResponse.class === 1) {
                returnFlightTotal = activeReturnFlight.first_class
            } else {
                returnFlightTotal = activeReturnFlight.base_price
            }

            if (returnFlightResponse.meals) {
                returnFlightTotal += returnFlightResponse.meals_price
            }

            if (returnFlightResponse.insurance) {
                returnFlightTotal += returnFlightResponse.insurance_price
            }

            const firstFlightData = {
                flight_id: activeFlight.id,
                customer_id: user.id,
                seat_number: firstFlightResponse.seatNumber,
                seat_row: seats[firstFlightResponse.seatRow],
                insurance: firstFlightResponse.insurance ? 1 : 2,
                meals: firstFlightResponse.meals ? 1 : 2,
                total_price: firstFlightTotal,
                flightClass: firstFlightResponse.class
            }

            const returnFlightData = {
                flight_id: activeReturnFlight.id,
                customer_id: user.id,
                seat_number: returnFlightResponse.seatNumber,
                seat_row: seats[returnFlightResponse.seatRow],
                insurance: returnFlightResponse.insurance,
                meals: returnFlightResponse.meals,
                total_price: returnFlightTotal,
                flightClass: returnFlightResponse.class
            }

            try {
                await this.props.axios.post('/api/flights/book_flights', {
                    returnFlightData,
                    firstFlightData,
                    double_flight: true
                })
                this.props.showAlert({
                    title: 'Successfully booked',
                    text: 'Your reservation has been successfully completed. You will now be able to check-in at the airport with your passport.'
                })
                this.setState({
                    from: 0, fromTouched: false,
                    to: 0, toTouched: false,
                    departureDate: '', departureDateTouched: false,
                    returnDate: '', returnDateTouched: false,
                    returnFlight: true,
                    searchingFlights: false,
                    departingFlights: [],
                    returnFlights: [],
                    returnFlightResults: false,
                    activeFlight: null,
                    activeReturnFlight: null,
                    seats: {},
                    returnSeats: {}
                })
            } catch (err) {
                console.log(err)
                this.props.showAlert({
                    title: 'Failed booking flight',
                    text: 'We could not book these flights. Please refresh and try again!'
                })
            }

        } else {
            const data = {
                flight_id: activeFlight.id,
                customer_id: user.id,
                seat_number: firstFlightResponse.seatNumber,
                seat_row: seats[firstFlightResponse.seatRow],
                insurance: firstFlightResponse.insurance,
                meals: firstFlightResponse.meals,
                total_price: total,
                flightClass: firstFlightResponse.class
            }

            try {
                await this.props.axios.post('/api/flights/book_flights', {firstFlightData: data, double_flight: false})
                this.props.showAlert({
                    title: 'Successfully booked',
                    text: 'Your reservation has been successfully completed. You will now be able to check-in at the airport with your passport.'
                })
                this.setState({
                    from: 0, fromTouched: false,
                    to: 0, toTouched: false,
                    departureDate: '', departureDateTouched: false,
                    returnDate: '', returnDateTouched: false,
                    returnFlight: true,
                    searchingFlights: false,
                    departingFlights: [],
                    returnFlights: [],
                    returnFlightResults: false,
                    activeFlight: null,
                    activeReturnFlight: null,
                    seats: {},
                    returnSeats: {}
                })
            } catch (err) {
                console.log(err)
                this.props.showAlert({
                    title: 'Failed booking flight',
                    text: 'We could not book this flight. Please refresh and try again!'
                })
            }
        }
    }


}