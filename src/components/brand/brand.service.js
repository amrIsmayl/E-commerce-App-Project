const { catchAsyncError } = require('../../utilts/catchAsync');
const slugify = require('slugify');
const AppError = require('../../utilts/AppError');
const brandModel = require('./brand.model');
const subCategoryModel = require('../subCategory/subCategory.model');



// create new brand
exports.createBrand = catchAsyncError(async (req, res) => {
    const { name, id } = req.body
    let subcategory = await subCategoryModel.findById(id);
    if (subcategory) {
        let brand = new brandModel({ name });
        await brand.save();
        res.status(200).json(brand);
    }
    return next(
        new AppError("category not found", 400)
    );
})



// get specific brand
exports.getBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let brand = await brandModel.findById(id);
    if (!brand) {
        return next(
            new AppError("brand not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(brand);
});




// to update specific brand
exports.updateBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    const { name } = req.body;
    let brand = await brandModel.findByIdAndUpdate(id, { name });
    if (!brand) {
        return next(
            new AppError("brand not found", 400)
        );
        // el return wazeftha stop el code lao el condetion success
        // badal ma n3mel else
    }
    res.status(200).json(brand);
});





// to delete specific brand
exports.deleteBrand = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let brand = await brandModel.findByIdAndDelete(id);
    if (!brand) {
        return next(
            new AppError("brand not found", 400)
        );
    }
    res.status(200).json(brand);
});




// exports.createBrand = catchAsyncError(async (req, res) => {
//     const { name, id } = req.body
//     let subCategory = await subCategoryModel.findById(id);
//     if (subCategory) {
//         let brand = new brandModel({ name, category, slug: slugify(name) });
//         await brand.save();
//         res.status(200).json(brand);
//     }
//     return next(
//         new AppError("category not found", 400)
//     );
// })