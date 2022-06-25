const { COOKIE_NAME } = require('../constants')
const { SECRET } = require('../config/env')
const jwt = require('jsonwebtoken')

exports.isAuthenticated = (req, res, next) => {
    const token = req.cookies[COOKIE_NAME]

    if (token) {
        jwt.verify(token, SECRET, ((err, decodedToken) => {
            if (err) {
                res.clearCookie(COOKIE_NAME)
                return next(err);
            }

            req.user = decodedToken
            res.locals.user = decodedToken

            next()
        }))
    } else {
        next()
    }
}

exports.isAuthorized = (req, res, next) => {
    if (req.user) {
        next()
    } else {
        res.render('errors')
    }
}

exports.isNotAuthorized = (req, res, next) => {
    if (req.user) {
        res.render('errors')
    } else {
        next()
    }
}