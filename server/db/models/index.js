const Game = require('./Game')
const GameSearch = require('./GameSearch')
const Poll = require('./Poll')
const User = require('./User')
const Vote = require('./Vote')

Poll.hasMany(Vote, 'votes', 'id', 'poll_id')

Vote.belongsTo(Poll, 'poll', 'poll_id', 'id')
Vote.belongsTo(Game, 'gameInfo', 'game_id', 'guid')

module.exports = { Game, GameSearch, Poll, User, Vote }
