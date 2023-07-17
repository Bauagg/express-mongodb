const mongoose = require('mongoose')

const { dbHost, dbPort, dbName } = require('../APP/config')

mongoose.connect(`mongodb://${dbHost}:${dbPort}/${dbName}`)

const db = mongoose.connection

module.exports = db