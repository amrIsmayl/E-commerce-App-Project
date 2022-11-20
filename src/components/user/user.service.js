const userModel = require('./user.model');
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require('../../utilts/catchAsync');
const AppError = require('../../utilts/AppError');


// create new users
exports.createUser = catchAsyncError(async (req, res, next) => {
    let isUser = await userModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError("user already exist", 401));
    // if email to user exist don't create new user
    let user = new userModel(req.body);
    await user.save();
    res.status(200).json({ result: user });
})

// get all users
exports.getUsers = factory.getAll(userModel)

// get specific user
exports.getUser = factory.specificOne(userModel)

// to update specific user
exports.updateUser = factory.updateSpacificOne(userModel)

// to delete specific user
exports.deleteUser = factory.deleteOne(userModel)