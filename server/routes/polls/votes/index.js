const path = require('path')

const routes = require('express').Router()
const db = require(path.join(__dirname, '..', '..', '..', 'db'))

const model = { model: 'Vote' }

// Get all votes under a certain poll
routes.get('/', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  db.find({
    ...model,
    filters: { poll_id: req.pollId }
  })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

// Place a vote
routes.get('/add/:gameId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  let twitchId = req.query.twitchId
  if (!twitchId) {
    return res.json({ success: false, error: 'The twitchId of user was not provided.' })
  }

  db.findOne({
    ...model,
    filters: { poll_id: req.pollId, game_id: req.params.gameId }
  })
    .then(response => {
      console.log('this is initial response', response)
      if (response) {
        // Check if user has voted
        console.log('GOT RESPONSE FROM VOTES =================', response)
        if (response.userVotes.some(user => user.twitchId === twitchId)) {
          return { message: 'The user has already voted.' }
        }

        return db.update({
          ...model,
          id: response.id,
          data: {
            count: response.count + 1
          }
        })
      } else {
        console.log('we are creating')
        return db.create({
          ...model,
          data: {
            count: 1,
            game_id: req.params.gameId,
            poll_id: req.pollId
          }
        })
      }
    })
    // Add in UserVote association
    .then(response => {
      console.log('did we create something?', response)
      return db.create({
        model: 'UserVote',
        data: {
          vote_id: response.id,
          twitchId
        }
      })
    })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

// Remove a vote
routes.get('/remove/:gameId', (req, res) => {
  res.setHeader('Content-Type', 'application/json')

  db.find({
    ...model,
    filters: { poll_id: req.pollId, game_id: req.params.gameId }
  })
    .then(response => {
      if (response && response.length > 0) {
        return db.update({
          ...model,
          id: response[0].id,
          data: {
            count: response[0].count - 1 > 0 ? response[0].count - 1 : 0
          }
        })
      }
      return response
    })
    .then(response => {
      res.json({ success: true, data: response })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

module.exports = routes
