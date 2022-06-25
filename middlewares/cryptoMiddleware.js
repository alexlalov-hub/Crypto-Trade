const cryptoService = require('../services/cryptoService')

exports.preLoadCrypto = async (req, res, next) => {
    const crypto = await cryptoService.findById(req.params.cryptoId)

    req.crypto = crypto

    next()
}

exports.isCryptoOwner = (req, res, next) => {
    if (req.crypto.owner._id != req.user._id) {
        return res.render('errors')
    }
    next();
}

exports.isNotCryptoOwner = (req, res, next) => {
    if (req.crypto.owner._id == req.user._id) {
        return res.render('errors')
    }
    next();
}