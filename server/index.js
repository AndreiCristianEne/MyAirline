import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import next from 'next'

// next init
const port = parseInt(process.env.PORT, 10) || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// api routes
import userApi from './api/user'
import citiesApi from './api/cities'
import flightsApi from './api/flights'

// next prepare
app.prepare()
    .then(() => {
        // server init
        const server = express()

        server.use(bodyParser.json({limit: '50mb'}))
        server.use(bodyParser.urlencoded({extended: false, limit: '50mb'}))
        server.use(cookieParser())

        // server.get('/posts/:id', (req, res) => {
        //     return app.render(req, res, '/posts', { id: req.params.id })
        // })

        server.use('/api/user', userApi)
        server.use('/api/cities', citiesApi)
        server.use('/api/flights', flightsApi)

        // server routes
        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(port, (err) => {
            if (err) throw err
            console.log(`Ready on http://localhost:${port}`)
        })
    })