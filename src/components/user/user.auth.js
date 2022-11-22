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
    // find user by email

    if (!user || !(await bcrypt.compare(req.body.password, user.password)))
        return next(new AppError("incorrect email or password", 401));
    // if user or hash password not exist return error 401
    // but if exist sign in user and create new token to user 
    let token = jwt.sign(
        { name: user.name, userId: user._id },
        process.env.JWT_KEY
    )
    res.status(200).json({ token });
})

// protected authentication
exports.protectedRoutes = catchAsyncError(async (req, res, next) => {
    let token = req.headers.token;
    if (!token) return next(new AppError("User not provided", 401));
    // 1- al t2keed 3la wgod token

    let decoded = await jwt.verify(token, process.env.JWT_KEY);
    // 2- Comparison "mokarna" the token with user token

    let user = await userModel.findById(decoded.userId)
    if (!user) return next(new AppError("User not found", 401))
    // 3- find by id user in token, because : if user is not found ==> if admin deleted user

    let changePassword = parseInt(user.passwordChangeAt.getTime() / 1000);
    // getTime() => to show time like decoded.iat
    // "/1000" => to Transformation time by milliseconds => time by seconds like "decoded.iat"
    // parseInt() => to remove numbers after seconds like (1234.432 => 1234)
    // all of this steps because Comparison (changePassword with decoded.iat)
    if (changePassword > decoded.iat)
        return next(new AppError("password changed", 401));
    // 4- Comparison time created token with user change Password, if user changed password

    req.user = user;

    next()
})

// authoriztion to accesses routes
exports.allowedTo = (...roles) => { // "...roles" => spreed : b7ol ay data morsla ela array 3shan search feha
    return catchAsyncError(async (req, res, next) => {
        if (!roles.includes(req.user.role))
            return next(new AppError("you are not authorized to accesses this route", 401));
        // if role user or admin in model false return error, but if role accesses go to next endpoint
        next()
    })
}