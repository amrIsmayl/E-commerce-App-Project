const userModel = require('../user/user.model');
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');


// to add wishlist 
exports.updateWishlist = catchAsyncError(async (req, res, next) => {
    let { wishlist } = await userModel.findByIdAndUpdate(req.user._id, {
        $addToSet: { wishlist: req.body.product } // "$addToSet" : if not found any wishlist then create new wishlist 
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json({ wishlist });
})


// to remove wishlist
exports.removeWishlist = catchAsyncError(async (req, res, next) => {

    let { wishlist } = await userModel.findByIdAndUpdate(req.user._id, {
        $pull: { wishlist: req.body.product }
        // "$pull" : to search for any wishlist in "array" and delete it 
        // "pop" : to remove last wishlist in "array"
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json({ wishlist });
})

// to get user wishlist
exports.getUserWishlist = catchAsyncError(async (req, res, next) => {
    let { wishlist } = await userModel.findById(req.user._id)
    !wishlist && next(new AppError("wishlist not found", 400));
    wishlist && res.status(200).json({ wishlist });
})