const cartModel = require('./cart.model');
const factory = require("../Handlers/handler.factory");
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');


// create new cart
exports.createCart = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id })
    // search to cart
    if (!cart) { // if not founded cart create new cart
        let newCart = new cartModel({ // the new cart
            cartItems: [req.body],
            user: req.body._id
        })
        await newCart.save() // save cart in database
        res.status(200).json(newCart);

    } else {
        console.log('add cart to item here');
    }
})
