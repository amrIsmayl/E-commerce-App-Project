
const { Schema, model, Types } = require('mongoose')

const schema = Schema({
    name: {
        type: String,
        required: [true, 'Product name required'],
        trim: true,
        unique: [true, 'Product name unique'],
        minlength: [2, 'too short Product name'],
    },
    slug: {
        type: String,
        lowercase: true
    },
    description: {
        type: String,
        required: [true, 'Product description required'],
        trim: true,
        minlength: [10, 'too short product description'],
    },
    quantity: {
        type: Number,
        required: [true, 'Product quantity required'],
        default: 0
    },
    colors: [String],
    price: {
        type: Number,
        required: [true, 'Product price required']
    },
    priceAfterDiscount: {
        type: Number,
        required: [true, 'Product price after discount required']
    },
    sold: {
        type: Number,
        required: [true, 'Product sold required'],
        default: 0
    },
    imageCover: String,
    image: [String],
    category: {
        type: Types.ObjectId,
        ref: 'category',
        required: [true, 'Product category required'],
    },
    subcategory: {
        type: Types.ObjectId,
        ref: 'subcategory',
        required: [true, 'Product subcategory required'],
    },
    brand: {
        type: Types.ObjectId,
        ref: 'brand',
        required: [true, 'Product brand required'],
    },
    retingAverage: {
        type: Number,
        min: [1, 'ratingAverage must be greater than 1'],
        min: [5, 'ratingAverage must be less than 5'],
    },
    retingCount: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

module.exports = model('Product', schema)