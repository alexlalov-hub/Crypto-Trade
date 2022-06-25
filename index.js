const express = require('express')
const hbs = require('express-handlebars')
const { PORT } = require('./config/env')
const { dbInit } = require('./config/database')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const { isAuthenticated } = require('./middlewares/authenticationMiddleware')

const app = express()

app.engine('hbs', hbs.engine({
    extname: 'hbs'
}))

app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: false }))
app.use(express.static('public'))
app.use(cookieParser())
app.use(isAuthenticated)
app.use(routes)

dbInit()
app.listen(PORT, () => console.log(`App is listening on port ${PORT}`))