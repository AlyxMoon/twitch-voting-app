const path = require('path')

const rethinkDB = require('rethinkdb')
const dbConfig = require(path.join(__dirname, '..', 'config', 'database'))

module.exports = {
  init: () => {
    rethinkDB.connect(dbConfig, (err, conn) => {
      if (err) throw err
      console.log('connection to rethinkDB success')
    })
  }
}
