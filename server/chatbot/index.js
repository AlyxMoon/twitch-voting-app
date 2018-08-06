require('dotenv').config()
const path = require('path')

const TwitchBot = require('twitch-bot')
const config = require(path.join(__dirname, 'config'))
const commands = require(path.join(__dirname, 'commands'))

const Bot = new TwitchBot(config)

Bot.on('join', channel => {
  console.log(`* Bot joined channel ${channel}`)
})


Bot.on('error', err => {
  console.error(`* Bot has receieved an error:`, err.message, err.stack)
})

Bot.on('message', context => {
  if (context.message.slice(0, 1) !== config.commandPrefix) {
    return
  }
  const [commandName, ...params] = context.message.slice(1).split(' ')
  const command = commands[commandName]

  command(context, params)
  console.log(`* Bot executed ${commandName} command for ${context.username}`)
})

module.exports = Bot
