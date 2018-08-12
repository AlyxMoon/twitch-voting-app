const path = require('path')
const fetch = require('isomorphic-unfetch')
const db = require(path.join(__dirname, '..', '..', 'db'))

const vote = ({ context, params, bot }) => {
  let game
  let gameToVote = params.join(' ')
  if (gameToVote.length === 0) return

  fetch(`http://localhost:8080/api/games/searchByName/${gameToVote}`)
    .then(response => response.json())
    .then(response => {
      let { results } = response.data
      if (results.length === 0) {
        bot.whisper(context.user.username, 'No results were found for that game!')
        return
      }
      if (results.length > 1) {
        bot.whisper(context.user.username, 'That vote was too vague. Please try again with a more specific vote')
        return
      }

      // Save game in database so we have a link for metainformation, like the name
      return fetch(`http://localhost:8080/api/games`, {
        method: 'POST',
        body: JSON.stringify({ data: results[0] }),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json())
    })
    .then(response => {
      if (!response || !response.success) return
      game = response.data
      return db.findOne({ model: 'Poll', filters: { active: true } })
    })
    .then(poll => {
      if (!poll) return

      return fetch(`http://localhost:8080/api/polls/${poll.id}/votes/add/${game.guid}?twitchId=${context.user['user-id']}`)
        .then(response => response.json())
    })
    .then((response) => {
      if (!response || !response.success) {
        bot.whisper(context.user.username, `${context.user.username}, your vote has not been recorded. You voted already!`)
      } else {
        bot.whisper(context.user.username, `${context.user.username}, your vote has been recorded for ${game.name}`)
      }
    })
    .catch(error => console.error(error.message, error.stack))
}

module.exports = vote
