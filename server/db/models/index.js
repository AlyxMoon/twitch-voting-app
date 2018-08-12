const Game = require('./Game')
const GameSearch = require('./GameSearch')
const Poll = require('./Poll')
const User = require('./User')
const UserVote = require('./UserVote')
const Vote = require('./Vote')

Poll.hasMany(Vote, 'votes', 'id', 'poll_id')

Vote.belongsTo(Poll, 'poll', 'poll_id', 'id')
Vote.belongsTo(Game, 'gameInfo', 'game_id', 'guid')
Vote.hasMany(UserVote, 'userVotes', 'id', 'vote_id')

module.exports = { Game, GameSearch, Poll, User, UserVote, Vote }
