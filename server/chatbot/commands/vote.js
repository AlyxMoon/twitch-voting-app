const path = require('path')

const db = require(path.join(__dirname, '..', '..', 'db'))
const errors = require(path.join(__dirname, '../../lib/errors'))
const fetchJSON = require(path.join(__dirname, '../../lib/fetchJSON'))

const vote = ({ context, params, bot }) => {
  let gameToVote = params.join(' ')
  if (gameToVote.length === 0) throw new errors.NoVoteGiven()

  fetchJSON(`http://localhost:8080/api/games/searchByName/${gameToVote}`)
    .then(response => {
      let { results } = response.data
      if (results.length === 0) throw new errors.GameNotFound()
      if (results.length > 1) throw new errors.GameTooVague()

      // Save game in database so we have a link for metainformation, like the name
      return Promise.all([
        fetchJSON(`http://localhost:8080/api/games`, {
          method: 'POST',
          body: JSON.stringify({ data: results[0] }),
          headers: { 'Content-Type': 'application/json' }
        }),
        db.findOne({ model: 'Poll', filters: { active: true } })
      ])
    })
    .then(([game, poll]) => {
      if (!game || !game.success) throw new errors.GameNotCreated('There was an error recalibrating the tabular data for the reticulations of your vote, please try again later')
      if (!poll) throw new errors.PollNotFound()

      let query = `?twitchId=${context.user['user-id']}&displayname=${context.user['display-name']}&username=${context.user.username}`

      return fetchJSON(`http://localhost:8080/api/polls/${poll.id}/votes/add/${game.data.guid}${query}`)
    })
    .then((response) => {
      if (!response || !response.success) throw new errors.UserAlreadyVoted()

      return bot.whisper(context.user.username, `your vote has been recorded for ${response.data.game.name}`)
    })
    .catch(error => {
      if (['GameNotFound', 'GameTooVague', 'UserAlreadyVoted'].includes(error.name)) {
        return bot.whisper(context.user.username, error.message)
      }

      if (['GameNotCreated', 'PollNotFound'].includes(error.name)) {
        return bot.whisper(context.user.username, error.message)
      }

      console.error(error.name, error.message, error.stack)
    })
}

module.exports = vote
