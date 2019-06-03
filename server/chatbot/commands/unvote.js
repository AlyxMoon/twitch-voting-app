const path = require('path')

const db = require(path.join(__dirname, '..', '..', 'db'))
const errors = require(path.join(__dirname, '../../lib/errors'))
const fetchJSON = require(path.join(__dirname, '../../lib/fetchJSON'))

const unvote = ({ context, params, bot }) => {
  db.findOne({ model: 'Poll', filters: { active: true } })
    .then(poll => {
      if (!poll) throw new errors.PollNotFound()
      if (!poll.allowVoteChange) throw new errors.PollCannotChangeVote()

      let query = `?twitchId=${context.user['user-id']}&displayname=${context.user['display-name']}&username=${context.user.username}`
      return fetchJSON(`http://localhost:8080/api/polls/${poll.id}/votes/remove${query}`)
    })
    .then((response) => {
      if (!response || !response.success) {
        if (response.error === 'The user has not voted yet.') throw new errors.UserHasNotVoted()
        if (response.error === 'There are no votes to remove for this game yet.') throw new errors.VoteDoesNotExist()
      }

      return bot.whisper(context.user.username, `your vote has been removed from the active poll`)
    })
    .catch(error => {
      if (['PollCannotChangeVote', 'PollNotFound', 'UserHasNotVoted', 'VoteDoesNotExist'].includes(error.name)) {
        return bot.whisper(context.user.username, error.message)
      }

      console.error(error.name, error.message, error.stack)
    })
}

module.exports = unvote
