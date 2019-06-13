const { channel } = require('../config/auth')
const chatbotConfig = require('../config/chatbot')
const bot = require('../chatbot')

let modsCache
module.exports = (user) => {
  return new Promise((resolve, reject) => {
    if (user && (user.username === channel || user.username === chatbotConfig.username)) {
      return resolve('ADMIN')
    }

    if (!modsCache) {
      bot.mods(channel)
        .then(data => {
          modsCache = [...data, channel, chatbotConfig.username]

          if (user && modsCache.includes(user.username)) {
            resolve('MOD')
          } else {
            resolve('USER')
          }
        })
        .catch(reject)
    } else {
      if (user && modsCache.includes(user.username)) {
        resolve('MOD')
      } else {
        resolve('USER')
      }
    }
  })
}
