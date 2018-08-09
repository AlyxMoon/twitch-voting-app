const path = require('path')
const fetch = require('isomorphic-unfetch')
const db = require(path.join(__dirname, '..', '..', 'db'))

const vote = ({ context, params, bot }) => {
  // TODO @allistermoon: Implement vote
  let game = params.join(' ')
  fetch(`http://localhost:8080/api/games/search/${game}`)
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
      return results[0]
    })
    .then(gameToVote => {
      if (!gameToVote) return

      game = gameToVote
      return db.findOne({ model: 'Poll', filter: { active: true } })
    })
    .then(poll => {
      if (!poll) return

      fetch(`http://localhost:8080/api/polls/${poll.id}/votes/add/${game.guid}`)
    })
}

module.exports = vote
