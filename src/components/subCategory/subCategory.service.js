const subCategoryModel = require('./subCategory.model');
const slugify = require('slugify');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');
// const subCategoryModel = require('../subCategory/subCategory.model');





// create new subcategory
exports.createSubCategory = catchAsyncError(async (req, res) => {
    const { name, category } = req.body
    let subCategory = new subCategoryModel({ name, slug: slugify(name), category });
    await subCategory.save();
    res.status(200).json(subCategory);
    // await CategoryModel.create(req.body);
    // await CategoryModel.insertMany(req.body)
})


// get all subcategories
exports.getSubCategories = catchAsyncError(async (req, res) => {
    let filter = {} ;
    if(req.params.categoryId){
    filter = {category: req.params.categoryId} ;
    }
    // second solution :
    // bn3mel var x"filter" feha => {} "object fady" , because if searh to all subcategories 
    // and bn3mel if condition : if search by ID to category = find subcategories to this category



    // frist solution :
    //console.log(req.originalUrl.split("/")[2]);
    // el req.originalUrl = the path of URL
    // bn3ml 3leha method split 3shan n7olha le Array and extraction the ID category 
    let subCategories = await subCategoryModel.find(filter);
    // bn3mel search by ID category if exists
    res.status(200).json(subCategories);
});



// get specific subcategory
exports.getSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let subCategory = await subCategoryModel.findById(id);
    if (!subCategory) {
        return next(
            new AppError("subcategory not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(subCategory);
});




// to update specific subcategory
exports.updateSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name, category } = req.body;
    let subCategory = await subCategoryModel.findByIdAndUpdate(id, {
        name,
        slug: slugify(name),
        category
    }, { new: true }); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!subCategory) {
        return next(
            new AppError("subcategory not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(subCategory);
});



// to delete specific subcategory
exports.deleteSubCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let subCategory = await subCategoryModel.findByIdAndDelete(id); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!subCategory) {
        return next(
            new AppError("subcategory not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(subCategory);
});