const { channel } = require('../config/auth')
const chatbotConfig = require('../config/chatbot')
const bot = require('../chatbot')

let modsCache
const adminAccessOnly = (req, res, next) => {
  if (req.ip === '127.0.0.1') return next()

  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  if (!modsCache) {
    bot.mods(channel)
      .then(data => {
        modsCache = [...data, channel, chatbotConfig.username]

        if (req.user && modsCache.includes(req.user.username)) {
          next()
        } else {
          res.json({ success: false, error: 'Only a mod can access this route' })
        }
      })
      .catch(next)
  } else {
    if (req.user && modsCache.includes(req.user.username)) {
      next()
    } else {
      res.json({ success: false, error: 'Only a mod can access this route' })
    }
  }
}

module.exports = adminAccessOnly
