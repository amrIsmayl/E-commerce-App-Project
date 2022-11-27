
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
    images: [String],
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
}, {
    timestamps: true,

    // thats 2 steps to show all reviews to product
    // we give them from mongoose web site
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

schema.virtual('reviews', { // reviews : any name of my choice
    ref: 'review', // review : the same name of schema review model
    localField: '_id', // _id : is id from product
    foreignField: 'product' // product : esm el 7aga el moshtaraka fe schema el d'eef 
    // moshtaraka b7eeth t7'os ay product oa7ed hayt3rd 
});

schema.pre('findOne', function () {
    // the "pre" is : edit data before save data in database // 3aks el post
    this.populate('reviews', 'name');
    // reviews : ???! // el mafrood da esm el schema ll review model, bas le 7at "s" fe a7'er el name
})

schema.post('init', (doc) => {
    // the "pre" is : edit data before save data in database 
    // post : edit data after save data in database
    if (doc.imageCover && doc.images) {
        let imgs = []
        doc.imageCover = "http://localhost:3000/product/" + doc.imageCover
        doc.images.forEach((elm) => {
            imgs.push("http://localhost:3000/product/" + elm)
        });
        doc.images = imgs
    }
})

module.exports = model('Product', schema)