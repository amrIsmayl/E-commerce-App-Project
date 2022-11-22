
const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcrypt');

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
        required: [true, 'password required'],
        minlength: [6, 'minlength 6 characters'],
    },
    passwordChangeAt: Date,
    profileImage: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'], // enum to Just choose between the two options 
        default: 'user'
    },
    isActive: {
        type: Boolean,
        default: true
    },
}, { timestamps: true })

schema.pre("save", async function () { // el save Only work with "crate" and "save" in database function in file user.service.js 
    // the "pre" is : edit data before save data in database // 3aks el post
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND))
})

schema.pre("findOneAndUpdate", async function () { // the "findOneAndUpdate" Only work with "findByIdAndUpdate" in database function in file user.service.js
    this._update.password = await bcrypt.hash(this._update.password, Number(process.env.ROUND))
})

module.exports = model('user', schema) 