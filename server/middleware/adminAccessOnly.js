const { channel } = require('../config/auth')
const chatbot = require('../config/chatbot')

const adminAccessOnly = (req, res, next) => {
  if (req.ip === '127.0.0.1') return next()

  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080')

  if (req.user && (req.user.username === channel || req.user.username === chatbot.username)) {
    next()
  } else {
    res.json({ success: false, error: 'Only an admin can access this route' })
  }
}

module.exports = adminAccessOnly
