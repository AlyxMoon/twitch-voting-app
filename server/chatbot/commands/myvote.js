const path = require('path')

const db = require(path.join(__dirname, '..', '..', 'db'))
const errors = require(path.join(__dirname, '../../lib/errors'))

const unvote = ({ context, params, bot }) => {
  db.findOne({ model: 'Poll', filters: { active: true } })
    .then(poll => {
      if (!poll) throw new errors.PollNotFound()

      return db.findOne({ model: 'UserVote', filters: { twitchId: context.user['user-id'] } })
    })
    .then(userVote => {
      if (!userVote) throw new errors.UserHasNotVoted('You have not yet voted in the active poll')

      return db.findOne({ model: 'Vote', filters: { id: userVote.vote_id } })
    })
    .then(vote => {
      if (!vote) throw new Error('there was no vote!')

      return db.findOne({ model: 'Game', filters: { guid: vote.game_id } })
    })
    .then(game => {
      if (!game) throw new Error('there was no game!')

      return bot.whisper(context.user.username, `You voted for ${game.name}`)
    })
    .catch(error => {
      if (['UserHasNotVoted', 'PollNotFound'].includes(error.name)) {
        return bot.whisper(context.user.username, error.message)
      }

      console.error(error.name, error.message, error.stack)
    })
}

module.exports = unvote
