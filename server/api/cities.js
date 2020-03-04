import {Router} from 'express'
import db from '../helpers/database'

const router = Router()

router.get('/get_cities', async (req, res) => {
    try {
        const fetchString = 'SELECT * FROM cities'
        const rows = await db.query(fetchString)
        if (rows.length > 0) {
            res.send(rows)
        } else {
            res.status(500).json({error: 'COULD NOT FETCH CITIES FROM THE DATABASE', status: 500})
        }
    } catch (err) {
        res.status(500).json({error: 'COULD NOT FETCH CITIES FROM THE DATABASE', status: 500})
    }
})

export default router