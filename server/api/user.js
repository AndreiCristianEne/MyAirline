import {Router} from 'express'
import db from '../helpers/database'
import auth from '../helpers/auth'
import {verifyToken} from '../helpers/middleware'

const router = Router()

router.post('/register', async (req, res) => {
    const {email, password, passportName, passportNumber, passportReleaseDate, passportExpirationDate, cardNumber, cardDate, cvv} = req.body
    const addString = `INSERT INTO users 
    (email, password, passport_name, passport_number, passport_release_date, passport_expiration_date, card_number, card_expiration_date, card_cvv) 
    VALUES ('${email}', '${password}', '${passportName}', '${passportNumber}', '${passportReleaseDate}', '${passportExpirationDate}', '${cardNumber}', '${cardDate}', '${cvv}')`

    try {
        await db.query(addString)
    } catch (err) {
        console.log(err)
        res.status(500).json({error: 'Failed to register the user.', status: 500})
    }
})

router.post('/login', async (req, res) => {

    const {email, password} = req.body
    const verifyString = `SELECT id FROM users WHERE email = '${email}' AND password = '${password}'`

    try {
        const rows = await db.query(verifyString)

        if (rows.length > 0) {
            const token = await auth.sign({id: rows[0].id})
            res.cookie('we_fly_token', token)
            res.status(200).send('OK')

        } else {
            throw new Error('COULD NOT AUTHENTICATE THE USER')
        }

    } catch (err) {
        res.status(500).json({error: 'COULD NOT AUTHENTICATE THE USER', status: 500})
    }

})

router.get('/verify_user', verifyToken, async (req, res) => {
    res.send('OK')
})

router.get('/logout', async (req, res) => {
    res.cookie('we_fly_token', null)
    res.status(200).send('OK')
})

router.get('/get_user', verifyToken, async (req, res) => {
    try {
        const selectUserString = `SELECT * FROM users WHERE id = ${res.locals.id}`
        const rows = await db.query(selectUserString)
        if (rows.length > 0) {
            res.send(rows[0])
        }
        res.status(500).json({error: 'USER IS NOT PRESENT IN THE DATABASE', status: 500})
    } catch (err) {
        res.status(500).json({error: 'COULD NOT FETCH USER DATA', status: 500})
    }
})

export default router