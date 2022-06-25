const Crypto = require('../models/Crypto')

exports.create = (cryptoData) => Crypto.create(cryptoData)

exports.findAll = () => Crypto.find().lean()

exports.findById = (id) => Crypto.findById(id).populate('owner').lean()

exports.findByIdUnleaned = (id) => Crypto.findById(id).populate('owner')

exports.updateOne = (id, cryptoData) => Crypto.findByIdAndUpdate(id, { $set: cryptoData })

exports.delete = (id) => Crypto.findByIdAndDelete(id)


