const reviewModel = require('./reviews.model');
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require('../../utilts/catchAsync');


// create new reviews
exports.createReview = catchAsyncError(async (req, res) => {
    let document = new reviewModel(req.body);
    await document.save();
    res.status(200).json({ document });
})

// get all reviews
exports.getReviews = factory.getAll(reviewModel)

// get specific review
exports.getReview = factory.specificOne(reviewModel)

// to update specific review
exports.updateReview = factory.updateSpacificOne(reviewModel)

// to delete specific review
exports.deleteReview = factory.deleteOne(reviewModel)