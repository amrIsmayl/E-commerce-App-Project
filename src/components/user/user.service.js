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

// to change password specific user
exports.changePassword = catchAsyncError(async (req, res, next) => {
    const { id } = req.params;
    if (req.body.name) {
        req.body.slug = slugify(req.body.name) // slugify() : is Transformation name form to slugify form, like : amr-mohamed-abd-el-monim
    }
    req.body.image = req.file?.filename; // the mark "?" ==>> if filename exists or not exists do it this
    let document = await userModel.findByIdAndUpdate(id, req.body
        , { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !document && new AppError("brand not found", 400)
    document && res.status(200).json({ result: document });
})

// to delete specific user
exports.deleteUser = factory.deleteOne(userModel)