
const { Schema, model, Types } = require('mongoose')
const bcrypt = require('bcrypt');

const schema = Schema({
    name: {
        type: String,
        required: [true, 'user name required'],
        trim: true,
        minlength: [2, 'too short user name'],
    },
    lastName: {
        type: String,
        required: [true, 'user last name required'],
        trim: true,
        minlength: [2, 'too short user last name'],
    },
    age: {
        type: Number,
        required: [true, 'user last name required'],
        trim: true,
        minlength: [16, 'too short user age'],
        maxlength: [80, 'too longer user age'],
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
        minlength: [4, 'minlength 6 characters'],
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
    wishlist: [{ type: Types.ObjectId, ref: 'product' }], // "ref : "product" => because it show with product api
    addresses: [{
        name: String,
        street: String,
        city: String,
        phone: Number,
    }]
}, { timestamps: true })

schema.pre("save", async function () { // el save Only work with "crate" and "save" in database function in file user.service.js 
    // the "pre" is : edit data before save data in database // 3aks el post
    this.password = await bcrypt.hash(this.password, Number(process.env.ROUND))
})

schema.pre("findOneAndUpdate", async function () { // the "findOneAndUpdate" Only work with "findByIdAndUpdate" in database function in file user.service.js
    if (this._update.password) {
        this._update.password = await bcrypt.hash(
            this._update.password,
            Number(process.env.ROUND))
    }
})

module.exports = model('user', schema) 