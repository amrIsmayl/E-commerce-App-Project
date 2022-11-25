const reviewModel = require('./reviews.model');
const factory = require("../Handlers/handler.factory");
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');
const jwt = require('jsonwebtoken');


// create new reviews
exports.createReview = catchAsyncError(async (req, res, next) => {
    const isReview = await reviewModel.findOne({ user: req.user._id, product: req.body.product })
    // search to review by product and user
    if (isReview) return next(new AppError('you are created a review before', 400))
    // if found any review with product by same user not create new review
    // but if not found any review with product by same user create new review

    let token = req.headers.token; // because given id from token
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.user = decoded.userId

    let document = new reviewModel(req.body);
    await document.save();
    res.status(200).json({ document });
})

// get all reviews
exports.getReviews = factory.getAll(reviewModel)

// get specific review
exports.getReview = factory.specificOne(reviewModel)

// to update specific review
exports.updateReview = catchAsyncError(async (req, res, next) => {
    let token = req.headers.token; // because given id from token
    let decoded = jwt.verify(token, process.env.JWT_KEY);
    req.body.user = decoded.userId
    const { id } = req.params;
    let isReview = await reviewModel.findById(id)
    if (isReview.user._id.toString() == decoded.userId) {
        let document = await reviewModel.findByIdAndUpdate(id, req.body
            , { new: true });
        // el new 3shan ===> show data befor update category because by default they show data after update
        !document && new AppError("brand not found", 400)
        document && res.status(200).json({ document });
    } else {
        next(new AppError('you are not created a review before'), 400)
    }


})

// to delete specific review
exports.deleteReview = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    let token = req.headers.token; // because given id from token

    let isReview = await reviewModel.findById(id) // search by id review in reviewModel

    let decoded = jwt.verify(token, process.env.JWT_KEY); // verify because given all data to user

    if (isReview.user.toString() == decoded.userId) { // compare id to user in review by id in token
        let document = await reviewModel.findByIdAndDelete(id); // el new 3shan ===> show data befor update category because by default they show data after update
        !document && new AppError("review not found", 400)
        document && res.status(200).json({ result: document });
    } else {
        next(new AppError('you are not created a review before'), 400)
    }
});