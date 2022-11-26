const userModel = require('../user/user.model');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');


// to add address 
exports.updateAddress = catchAsyncError(async (req, res, next) => {
    let { addresses } = await userModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { addresses: req.body } // "$addToSet" : if not found any address then create new address 
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !addresses && next(new AppError("address not found", 400));
    addresses && res.status(200).json({ addresses });
})


// to remove address
exports.removeAddress = catchAsyncError(async (req, res, next) => {

    let { addresses } = await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { addresses: { _id: req.body.address } }
        // "$pull" : to search for any address in "array" and delete it 
        // "pop" : to remove last address in "array"
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !addresses && next(new AppError("address not found", 400));
    addresses && res.status(200).json({ addresses });
})

// to get user address
exports.getUserAddress = catchAsyncError(async (req, res, next) => {
    let { addresses } = await userModel.findById(req.user._id)
    !addresses && next(new AppError("address not found", 400));
    addresses && res.status(200).json({ addresses });
})