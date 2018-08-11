const path = require('path')
const fetch = require('isomorphic-unfetch')
const db = require(path.join(__dirname, '..', '..', 'db'))

const vote = ({ context, params, bot }) => {
  // TODO @allistermoon: Implement vote
  let game = params.join(' ')
  if (game.length === 0) return

  fetch(`http://localhost:8080/api/games/searchByName/${game}`)
    .then(response => response.json())
    .then(response => {
      let { results } = response.data
      if (results.length === 0) {
        bot.say(context.channel, 'No results were found for that game!')
        return
      }
      if (results.length > 1) {
        bot.say(context.channel, 'That vote was too vague. Please try again with a more specific vote')
        return
      }

      // DO STUFF TO VOTE
      bot.say(context.channel, `Yeah! I am recording your vote for ${results[0].name}`)

      // Save game in database so we have a link for metainformation, like the name
      return fetch(`http://localhost:8080/api/games`, {
        method: 'POST',
        body: JSON.stringify({ data: results[0] }),
        headers: { 'Content-Type': 'application/json' }
      }).then(response => response.json())
    })
    .then(response => {
      if (!response.success) return

      game = response.data[0]
      return db.findOne({ model: 'Poll', filter: { active: true } })
    })
    .then(poll => {
      if (!poll) return

      fetch(`http://localhost:8080/api/polls/${poll.id}/votes/add/${game.guid}`)
    })
    .catch(error => {
      console.error(error.message, error.stack)
    })
}

module.exports = vote
