const brandModel = require('./brand.model');
const factory = require("../Handlers/handler.factory");


// create new brands
exports.createBrand = factory.createOne(brandModel)

// get all brands
exports.getbrands = factory.getAll(brandModel)

// get specific brand
exports.getBrand = factory.specificOne(brandModel)

// to update specific brand
exports.updateBrand = factory.updateSpacificOne(brandModel)

// to delete specific brand
exports.deleteBrand = factory.deleteOne(brandModel)