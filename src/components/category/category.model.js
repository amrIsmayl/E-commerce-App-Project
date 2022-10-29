
const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'category name required'],
        trim: true,
        unique: [true, 'category name unique'],
        minlength: [2, 'too short category name'],
    },
    slug: {  // bnst5dm el slug fe ezhar name lel montag m3a el URL
        // and ben kol name and name lel category bdal el spas 
        type: String,
        lowercase: true
    },
    image: String
}, { timestamps: true })

module.exports = model('category', schema)