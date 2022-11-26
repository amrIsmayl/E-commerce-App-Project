const couponModel = require('./coupon.model');
const factory = require("../Handlers/handler.factory");


// create new reviews
exports.createCoupon= factory.createOne(couponModel)

// get all reviews
exports.getCoupons = factory.getAll(couponModel)

// get specific review
exports.getCoupon= factory.specificOne(couponModel)

// to update specific review
exports.updateCoupon= factory.updateSpacificOne(couponModel)

// to delete specific review
exports.deleteCoupon= factory.deleteOne(couponModel)