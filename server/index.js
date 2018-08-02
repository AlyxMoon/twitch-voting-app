require('dotenv').config()

const path = require('path')

const express = require('express')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const serverConfig = require(path.join(__dirname, 'config', 'server'))

const db = require(path.join(__dirname, 'db'))
db.init()

const app = express()
app.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

app.use(cors())
app.use(cookieParser())
app.use(bodyParser())
app.use(session({ secret: 'pokket-voting-app' }))

require('./routes')(app)

app.listen(serverConfig.port, serverConfig.host)
console.log(`Pokket voting server running on http://${serverConfig.host}:${serverConfig.port}`)
