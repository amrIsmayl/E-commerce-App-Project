
const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'user name required'],
        trim: true,
        minlength: [2, 'too short user name'],
    },
    email: {
        type: String,
        required: [true, 'email required'],
        trim: true,
        unique: [true, 'email must br unique'],
    },
    phone: {
        type: Number,
        required: [true, 'phone required'],
    },
    password: {
        type: String,
        required: [true, 'phone password'],
        minlength: [6, 'minlength 6 characters'],
    },
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // enum to Just choose between the two options 
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

module.exports.model('user', schema)