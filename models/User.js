const mongoose = require('mongoose')

const bcrypt = require('bcrypt')
const { SALT_ROUNDS } = require('../config/env')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minLength: [5, 'Email must be longer than 10 symbols']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minLength: [5, 'Username must be longer than 5 symbols']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [5, 'Password must be longer than 4 symbols']
    }
})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, SALT_ROUNDS)
        .then(hashedPassword => {
            this.password = hashedPassword

            next()
        })
})

const User = mongoose.model('User', userSchema)

module.exports = User;