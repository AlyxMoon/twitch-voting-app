require('dotenv').config()
const path = require('path')

const { client: Client } = require('twitch-js')
const config = require(path.join(__dirname, '..', 'config', 'chatbot'))
const commands = require(path.join(__dirname, 'commands'))

let bot

const messageCallback = (channel, user, message, self) => {
  if (message[0] !== config.commandPrefix) return

  const [commandName, ...params] = message.slice(1).split(' ')
  if (!(commandName in commands)) return

  const command = commands[commandName]
  command({
    context: { channel, user, message },
    params,
    bot
  })

  console.log(`Bot executed ${commandName} for ${user.username}`)
}

module.exports = {
  init: () => {
    bot = new Client({
      connection: {
        reconnect: true,
        secure: true
      },
      identity: {
        username: config.username,
        password: config.oauth
      },
      channels: [config.channel]
    })
    bot.connect()
    bot.on('message', messageCallback)
  },

  mods: (channelName) => {
    return bot.mods(channelName)
  }
}
