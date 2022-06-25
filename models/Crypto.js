const mongoose = require('mongoose')

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minLength: 2
    },
    image: {
        type: String,
        required: [true, 'Image is required'],
        validate: {
            validator: function () {
                return this.image.startsWith('http://') || this.image.startsWith('https://')
            },
            message: 'Image must with http:// or https://'
        }
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        validate: {
            validator: function () {
                return this.price > 0
            },
            message: 'Price must be a positive number'
        }
    },
    cryptoDescription: {
        type: String,
        required: [true, 'Description is required'],
        minLength: 10
    },
    paymentMethod: {
        type: String,
        enum: ['crypto-wallet', 'credit-card', 'debit-card', 'paypal'],
        required: [true, 'Payment method is required']
    },
    buyACrypto: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
})

const Crypto = mongoose.model('Crypto', cryptoSchema)

module.exports = Crypto