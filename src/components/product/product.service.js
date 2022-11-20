const productModel = require('./product.model');
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require('../../utilts/catchAsync');
const { default: slugify } = require('slugify');


// create new products
exports.createProduct = catchAsyncError(async (req, res) => {
    req.body.slug = slugify(req.body.name) // slugify() : is Transformation name form to slugify form, like : amr-mohamed-abd-el-monim
    req.body.image = req.file?.filename; // the mark "?" ==>> if filename exists or not exists do it this
    let imgs = []
    req.body.imageCover = req.files.imageCover[0].filename
    req.files.images.forEach((elm) => {
        imgs.push(elm.filename)
    })
    req.body.images = imgs
    let document = new productModel(req.body);
    await document.save();
    res.status(200).json({ result: document });
});

// get all products
exports.getProducts = factory.getAll(productModel);

// get specific product
exports.getproduct = factory.specificOne(productModel);

// to update specific product
exports.updateProduct = factory.updateSpacificOne(productModel)

// to delete specific product
exports.deleteProduct = factory.deleteOne(productModel);