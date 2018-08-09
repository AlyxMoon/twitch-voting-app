const GameSearch = require('./GameSearch')
const Poll = require('./Poll')
const User = require('./User')
const Vote = require('./Vote')

Poll.hasMany(Vote, 'votes', 'id', 'poll_id')
Vote.belongsTo(Poll, 'poll', 'poll_id', 'id')

module.exports = { GameSearch, Poll, User, Vote }
