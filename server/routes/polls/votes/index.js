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

  let { displayname, username, twitchId } = req.query
  let { gameId } = req.params
  let { pollId } = req

  if (!twitchId) {
    return res.json({ success: false, error: 'The twitchId of user was not provided.' })
  }

  db.findOrCreate({
    model: 'User',
    key: 'twitchId',
    data: { displayname, username, twitchId }
  })
    .then(() => {
      return db.find({
        model: 'UserVote',
        filters: { twitchId, poll_id: pollId }
      })
    })
    .then(response => {
      if (response.length === 0) {
        return db.findOne({
          ...model,
          filters: { poll_id: pollId, game_id: gameId }
        })
      } else {
        throw new Error('The user has already voted.')
      }
    })
    .then(response => {
      if (response) {
        return db.update({
          ...model,
          id: response.id,
          data: {
            count: response.count + 1
          }
        })
      } else {
        return db.create({
          ...model,
          data: {
            count: 1,
            game_id: gameId,
            poll_id: pollId
          }
        })
      }
    })
    // Add in UserVote association
    .then(response => {
      // Do promise all so that in the next chain we'll have the game name conveniently available, as that's all I currently care about displaying
      return Promise.all([
        db.create({
          model: 'UserVote',
          data: {
            poll_id: pollId,
            vote_id: response.id,
            twitchId
          }
        }),
        db.findOne({ model: 'Game', filters: { guid: gameId } })
      ])
    })
    .then(([userVote, game]) => {
      res.json({ success: true, data: { userVote, game } })
    })
    .catch(error => {
      res.json({ success: false, error: error.message })
    })
})

// Set a reaction on a vote
routes.post('/:id/reaction', (req, res) => {
  res.setHeader('Content-Type', 'application/json')
  let { emoteLink } = req.body
  let id = req.params.id
  if (!emoteLink) {
    return res.json({ success: false, error: 'a required field was not included' })
  }

  db.update({ ...model, id, data: { emoteLink } })
    .then(result => {
      res.json({ success: true, data: result })
    })
    .catch(error => {
      console.error(error.message, error.stack)
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
