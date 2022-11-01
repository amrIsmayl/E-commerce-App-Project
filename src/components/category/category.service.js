const CategoryModel = require('./category.model');
const slugify = require('slugify');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');
const subCategoryModel = require('../subCategory/subCategory.model');





// create new category
exports.createCategory = catchAsyncError(async (req, res) => {
    const { name } = req.body
    let category = new CategoryModel({ name, slug: slugify(name) });
    await category.save();
    res.status(200).json(category);
    // await CategoryModel.create(req.body);
    // await CategoryModel.insertMany(req.body)
})


// get all categories
exports.getCategories = catchAsyncError(async (req, res) => {
    let categories = await CategoryModel.find({});
    res.status(200).json(categories);
});



// get specific category
exports.getCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let category = await CategoryModel.findById(id);
    if (!category) {
        return next(
            new AppError("category not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
});



// // get specific subcategory by category
// exports.getSubCategorys = catchAsyncError(async (req, res, next) => {
//     const { id } = req.params;
//     let categor = await CategoryModel.findById(id);
//     let subcategories = await subCategoryModel.find({ category: id })
//     if (!categor) {
//         return next(
//             new AppError("category not found", 400)
//         );
//         // el return wazeftha stop el code lao el condetion success
//         // badal ma n3mel else
//     }
//     res.status(200).json({ categor, subcategories });
// });




// to update specific category
exports.updateCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await CategoryModel.findByIdAndUpdate(id, {
        name,
        slug: slugify(name)
    }, { new: true }); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!category) {
        return next(
            new AppError("category not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
});



// to delete specific category
exports.deleteCategory = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let category = await CategoryModel.findByIdAndDelete(id); // el new 3shan ===> show data befor update category because by default they show data after update
    if (!category) {
        return next(
            new AppError("category not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(category);
});
