const path = require('path')

const db = require(path.join(__dirname, '..', '..', 'db'))
const errors = require(path.join(__dirname, '../../lib/errors'))
const fetchJSON = require(path.join(__dirname, '../../lib/fetchJSON'))

const vote = ({ context, params, bot }) => {
  let gameToVote = params.join(' ')

  return Promise.resolve()
    .then(() => {
      if (gameToVote.length === 0) throw new errors.NoVoteGiven()
      return fetchJSON(`http://localhost:8080/api/games/searchByName/${gameToVote}`)
    })
    .then(response => {
      let index = 0
      let { results } = response.data

      // If no results, then obviously no game has been found, that's a problem
      if (results.length === 0) throw new errors.GameNotFound()

      // If there are more than one result, then we need to check and see if the exact name of the gameToVote is in them
      // As this can happen with games with sequels (i.e. 'The Sims')
      if (results.length > 1) {
        index = results.findIndex(result => result.name === gameToVote)

        if (index === -1) throw new errors.GameTooVague()
      }

      // Save game in database so we have a link for metainformation, like the name
      return Promise.all([
        fetchJSON(`http://localhost:8080/api/games`, {
          method: 'POST',
          body: JSON.stringify({ data: results[index] }),
          headers: { 'Content-Type': 'application/json' }
        }),
        db.findOne({ model: 'Poll', filters: { active: true } })
      ])
    })
    .then(([game, poll]) => {
      if (!game || !game.success) throw new errors.GameNotCreated('There was an error recalibrating the tabular data for the reticulations of your vote, please try again later')
      if (!poll) throw new errors.PollNotFound()

      if (game.data.banned) throw new errors.GameBanned()

      let query = `?twitchId=${context.user['user-id']}&displayname=${context.user['display-name']}&username=${context.user.username}`

      return fetchJSON(`http://localhost:8080/api/polls/${poll.id}/votes/add/${game.data.guid}${query}`)
    })
    .then((response) => {
      if (!response || !response.success) throw new errors.UserAlreadyVoted()

      return bot.whisper(context.user.username, `your vote has been recorded for ${response.data.game.name}`)
    })
    .catch(error => {
      if (['GameBanned', 'GameNotCreated', 'GameNotFound', 'GameTooVague', 'PollNotFound', 'UserAlreadyVoted'].includes(error.name)) {
        return bot.whisper(context.user.username, error.message)
      }

      console.error(error.name, error.message, error.stack)
    })
}

module.exports = vote
