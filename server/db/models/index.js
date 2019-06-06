const Game = require('./Game')
const GameAlias = require('./GameAlias')
const GameSearch = require('./GameSearch')
const Poll = require('./Poll')
const User = require('./User')
const UserVote = require('./UserVote')
const Vote = require('./Vote')

Poll.hasMany(UserVote, 'userVotes', 'id', 'poll_id')
Poll.hasMany(Vote, 'votes', 'id', 'poll_id')

UserVote.belongsTo(User, 'user', 'twitchId', 'twitchId')

Vote.belongsTo(Poll, 'poll', 'poll_id', 'id')
Vote.belongsTo(Game, 'gameInfo', 'game_id', 'guid')

Game.hasMany(GameAlias, 'aliases', 'id', 'game_id')

module.exports = { Game, GameAlias, GameSearch, Poll, User, UserVote, Vote }
