
const { Schema, model, Types } = require('mongoose')

const schema = Schema(
    {
        code: {
            type: String,
            required: [true, 'copon code required'],
            trim: true,
            unique: [true, 'copon code unique'],
        },
        expires: {
            type: Date,
        },
        discount: {
            type: Number,
        },
    },
    { timestamps: true }
);

module.exports = model('copon', schema)