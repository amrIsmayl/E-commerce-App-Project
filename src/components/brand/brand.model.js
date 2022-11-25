
const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'brand name required'],
        trim: true,
        unique: [true, 'brand name unique'],
        minlength: [2, 'too short brand name'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

schema.post('init', (doc) => {
    // the "pre" is : edit data before save data in database // 3aks el post
    doc.image = "http://localhost:3000/categories/" + doc.image
})

module.exports = model('brand', schema)