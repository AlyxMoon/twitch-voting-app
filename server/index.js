require('dotenv').config()

const path = require('path')

const express = require('express')
const cors = require('cors')

const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

const serverConfig = require(path.join(__dirname, 'config', 'server'))
const passport = require(path.join(__dirname, 'auth'))

const db = require(path.join(__dirname, 'db'))
db.init()

const bot = require(path.join(__dirname, 'chatbot'))
bot.init()

const app = express()
app.use('/static', express.static(path.join(__dirname, 'dist', 'static')))

app.use(cors({ credentials: true, origin: 'http://localhost:8080' }))
app.use(cookieParser())
app.use(bodyParser())
app.use(session({
  secret: 'pokket-voting-app',
  resave: false,
  saveUninitialized: false,
  cookie: { sameSite: false }
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes')(app)

app.listen(serverConfig.port, serverConfig.host)
console.log(`Pokket voting server running on http://${serverConfig.host}:${serverConfig.port}`)
