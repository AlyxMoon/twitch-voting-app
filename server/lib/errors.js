class GameBanned extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'The game you tried to vote for is banned, so your vote has not been counted.'
    this.extra = extra
  }
}

class GameNotCreated extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'There was an error setting or retrieving the game data from the server.'
    this.extra = extra
  }
}

class GameNotFound extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'No results for found for that game!'
    this.extra = extra
  }
}

class GameTooVague extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'That vote was too vague. Please try again with a more specific vote.'
    this.extra = extra
  }
}

class NoVoteGiven extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'You need to provide the name of the game to vote for.'
    this.extra = extra
  }
}

class PollCannotChangeVote extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'The currently active poll does not allow changing your vote.'
    this.extra = extra
  }
}

class PollNotFound extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'An active poll was not found, unable to process your vote.'
    this.extra = extra
  }
}

class UserHasNotVoted extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'The user has not voted yet.'
    this.extra = extra
  }
}

class UserAlreadyVoted extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'You have already voted in this poll.'
    this.extra = extra
  }
}

class VoteDoesNotExist extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'There are no votes to remove for this game yet.'
    this.extra = extra
  }
}

module.exports = {
  GameBanned,
  GameNotCreated,
  GameNotFound,
  GameTooVague,
  NoVoteGiven,
  PollCannotChangeVote,
  PollNotFound,
  UserHasNotVoted,
  UserAlreadyVoted,
  VoteDoesNotExist
}
