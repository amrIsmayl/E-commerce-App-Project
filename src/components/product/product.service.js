const productModel = require('./product.model');
const factory = require("../Handlers/handler.factory");


// create new products
exports.createProduct = factory.createOne(productModel);

// get all products
exports.getProducts = factory.getAll(productModel);

// get specific product
exports.getproduct = factory.specificOne(productModel);

// to update specific product
exports.updateProduct = factory.updateSpacificOne(productModel)

// to delete specific product
exports.deleteProduct = factory.deleteOne(productModel);