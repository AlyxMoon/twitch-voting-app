const path = require('path')

const rethinkDB = require('rethinkdb')
const dbConfig = require(path.join(__dirname, '..', 'config', 'database'))

const { Poll, Vote } = require(path.join(__dirname, 'models'))
const knownModels = { Poll, Vote }

module.exports = {
  init: () => {
    rethinkDB.connect(dbConfig, (err, conn) => {
      if (err) throw err

      console.log('connection to rethinkDB success')
    })
  },
  create: ({ model = '', data = {} }) => {
    return new Promise((resolve, reject) => {
      if (!Object.keys(knownModels).some(knownModel => knownModel === model)) {
        return reject(new Error(`Model ${model} was not recognized as a valid type`))
      }

      const newModel = new knownModels[model](data)
      return resolve(newModel.saveAll())
    })
  }
}
