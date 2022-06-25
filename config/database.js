const mongoose = require('mongoose')
const { QUERY_STRING } = require('./env')

exports.dbInit = () => {
    mongoose.connection.on('open', () => console.log('Database connected'))

    return mongoose.connect(QUERY_STRING)
}