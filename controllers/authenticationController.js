const router = require('express').Router()

const authenticationService = require('../services/authenticationService')
const { COOKIE_NAME } = require('../constants')
const { isAuthorized, isNotAuthorized } = require('../middlewares/authenticationMiddleware')
const { getErrorMessage } = require('../utilities/errorMapper')

router.get('/login', isNotAuthorized, (req, res) => {
    res.render('authentication/login')
})

router.get('/register', isNotAuthorized, (req, res) => {
    res.render('authentication/register')
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await authenticationService.login(email, password)
        const token = await authenticationService.createToken(user)

        res.cookie(COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch (error) {
        return res.render('authentication/login', { error: getErrorMessage(error) })
    }
})

router.post('/register', async (req, res) => {
    const { email, username, password, repeatPassword } = req.body

    if (password !== repeatPassword) {
        return res.render('authentication/register', { error: 'Passwords must match!' })
    }

    try {
        const user = await authenticationService.create({ email, username, password })
        const token = await authenticationService.createToken(user)
        res.cookie(COOKIE_NAME, token, { httpOnly: true })
        res.redirect('/')
    } catch (error) {
        return res.render('authentication/register', { error: getErrorMessage(error) })
    }
})

router.get('/logout', isAuthorized, (req, res) => {
    res.clearCookie(COOKIE_NAME)
    res.redirect('/')
})
module.exports = router