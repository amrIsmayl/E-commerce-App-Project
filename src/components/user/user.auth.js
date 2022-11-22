const userModel = require('./user.model');
const factory = require("../Handlers/handler.factory");
const { catchAsyncError } = require('../../utilts/catchAsync');
const AppError = require('../../utilts/AppError');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


// signUp new users
exports.signUp = catchAsyncError(async (req, res, next) => {
    let isUser = await userModel.findOne({ email: req.body.email })
    if (isUser) return next(new AppError("user already exist", 401));
    // if email to user exist don't create new user
    let user = new userModel(req.body);
    await user.save();
    res.status(200).json({ result: user });
})

// signIn user
exports.signIn = catchAsyncError(async (req, res, next) => {
    let user = await userModel.findOne({ email: req.body.email })

    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new AppError("incorrect email or password", 401));
    // if email to user exist don't create new user
    let token = jwt.sign(
        { name: user.name, userId: user._id },
        process.env.JWT_KEY
    )
    res.status(200).json({token});
})