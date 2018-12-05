
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

class PollNotFound extends Error {
  constructor (message = '', extra = null) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'An active poll was not found, unable to process your vote.'
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

module.exports = {
  GameNotCreated,
  GameNotFound,
  GameTooVague,
  NoVoteGiven,
  PollNotFound,
  UserAlreadyVoted
}
