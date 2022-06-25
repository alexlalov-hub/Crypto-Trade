const router = require('express').Router()
const mongoose = require('mongoose')

const cryptoService = require('../services/cryptoService')
const { isAuthorized } = require('../middlewares/authenticationMiddleware')
const { preLoadCrypto, isCryptoOwner, isNotCryptoOwner } = require('../middlewares/cryptoMiddleware')

router.get('/catalog', async (req, res) => {
    const cryptos = await cryptoService.findAll()

    res.render('crypto', { cryptos })
})

router.get('/create', isAuthorized, (req, res) => {
    res.render('crypto/create')
})

router.post('/create', (req, res) => {
    cryptoService.create({ ...req.body, owner: req.user._id })

    res.redirect('/')
})

router.get('/details/:cryptoId', async (req, res) => {
    const crypto = await cryptoService.findById(req.params.cryptoId)
    const isOwner = crypto.owner._id == req.user?._id
    const hasBought = crypto.buyACrypto.map(x => x.toString()).includes(req.user._id)

    res.render('crypto/details', { ...crypto, isOwner, hasBought })
})

router.get('/edit/:cryptoId', isAuthorized, preLoadCrypto, isCryptoOwner, async (req, res) => {
    const crypto = await cryptoService.findById(req.params.cryptoId)

    if (crypto.owner._id != req.user._id) {
        return res.render('errors')
    }

    crypto[`method${crypto.paymentMethod.split('-')[0]}`] = true;

    res.render('crypto/edit', { crypto })
})

router.post('/edit/:cryptoId', async (req, res) => {
    await cryptoService.updateOne(req.params.cryptoId, req.body)

    res.redirect(`/details/${req.params.cryptoId}`)
})

router.get('/buy/:cryptoId', isAuthorized, preLoadCrypto, isNotCryptoOwner, async (req, res) => {
    const crypto = await cryptoService.findByIdUnleaned(req.params.cryptoId)

    crypto.buyACrypto.push(req.user._id)

    await crypto.save()

    res.redirect(`/details/${req.params.cryptoId}`)
})

router.get('/delete/:cryptoId', isAuthorized, preLoadCrypto, isCryptoOwner, async (req, res) => {
    await cryptoService.delete(req.params.cryptoId)

    res.redirect('/catalog')
})

module.exports = router