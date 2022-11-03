const CategoryModel = require('./category.model');
const factory = require("../Handlers/handler.factory");


// create new category
exports.createCategory = factory.createOne(CategoryModel);

// get all categories
exports.getCategories = factory.getAll(CategoryModel);

// get specific category
exports.getCategory = factory.specificOne(CategoryModel);

// to update specific category
exports.updateCategory = factory.updateSpacificOne(CategoryModel);

// to delete specific category
exports.deleteCategory = factory.deleteOne(CategoryModel);