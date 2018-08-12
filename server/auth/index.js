const path = require('path')
const passport = require('passport')
const { Strategy: TwitchStrategy } = require('passport-twitch')

const { get, findOrCreate } = require(path.join(__dirname, '..', 'db'))
const config = require(path.join(__dirname, '..', 'config', 'auth'))

passport.use(new TwitchStrategy({
  clientID: config.clientId,
  clientSecret: config.clientSecret,
  callbackURL: config.redirectUri,
  scope: config.scopes
},
(accessToken, refresh, profile, done) => {
  const data = {
    twitchId: String(profile.id),
    username: profile.username,
    displayname: profile.displayName
  }
  findOrCreate({ model: 'User', data })
    .then(response => {
      done(null, response)
    })
    .catch(error => {
      done(error)
    })
}))

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser((id, done) => {
  get({ model: 'User', id })
    .then(user => done(null, user))
    .catch(done)
})

module.exports = passport
