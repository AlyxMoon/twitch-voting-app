require('dotenv').config()
const path = require('path')

const { client: Client } = require('twitch-js')
const config = require(path.join(__dirname, '..', 'config', 'chatbot'))
// const commands = require(path.join(__dirname, 'commands'))

const bot = new Client({
  connection: {
    reconnect: true,
    secure: true
  },
  identity: {
    username: config.username,
    password: config.oauth
  }
})

bot.connect()
module.exports = bot
