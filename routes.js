const router = require('express').Router()

const homeController = require('./controllers/homeController')
const authController = require('./controllers/authenticationController')
const cryptoController = require('./controllers/cryptoController')

router.use(homeController)
router.use(authController)
router.use(cryptoController)

module.exports = router