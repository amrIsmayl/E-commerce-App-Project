const subCategoryModel = require('./subCategory.model');
const { catchAsyncError } = require('../../utilts/catchAsync');
const factory = require("../Handlers/handler.factory");


// create new subcategory
exports.createSubCategory = factory.createOne(subCategoryModel);

// get all subcategories
exports.getSubCategories = catchAsyncError(async (req, res) => {
    let filter = {};
    if (req.params.categoryId) {
        filter = { category: req.params.categoryId };
    }
    // second solution "the top" :
    // bn3mel var x"filter" feha => {} "object fady" , because if search to all subcategories 
    // and bn3mel if condition : if search by ID to category = find subcategories to this category
    // --------------------------------------------
    // frist solution "not top" :
    //console.log(req.originalUrl.split("/")[2]);
    // el req.originalUrl = the path of URL
    // bn3ml 3leha method split 3shan n7olha le Array and extraction the ID category 
    let subCategories = await subCategoryModel.find(filter);
    // bn3mel search by ID category if exists
    res.status(200).json(subCategories);
});

// get specific subcategory
exports.getSubCategory = factory.specificOne(subCategoryModel);

// to update specific subcategory
exports.updateSubCategory = factory.updateSpacificOne(subCategoryModel);

// to delete specific subcategory
exports.deleteSubCategory = factory.deleteOne(subCategoryModel);