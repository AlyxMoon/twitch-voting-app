const path = require('path')
const passport = require(path.join(__dirname, '..', '..', 'auth'))

const routes = require('express').Router()

routes.get('/auth', passport.authenticate('twitch'))

routes.get('/auth/callback',
  passport.authenticate('twitch', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('http://localhost:8080')
  }
)

module.exports = routes
