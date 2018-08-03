const Poll = require('./Poll')
const Vote = require('./Vote')

Poll.hasMany(Vote, 'votes', 'id', 'poll_id')
Vote.belongsTo(Poll, 'poll', 'poll_id', 'id')

module.exports = { Poll, Vote }
