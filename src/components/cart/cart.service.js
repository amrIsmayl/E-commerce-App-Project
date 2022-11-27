const cartModel = require('./cart.model');
const factory = require("../Handlers/handler.factory");
const AppError = require('../../utilts/AppError');
const { catchAsyncError } = require('../../utilts/catchAsync');
const productModel = require('../product/product.model');
const couponModel = require('../coupon/coupon.model');


function calTotalCaertPrice(cart) { // function to calculate total price product
    let totalPrice = 0; // set total price = 0 in start
    cart.cartItems.forEach((elm) => { // loop to all product * quantity 
        totalPrice += elm.price * elm.quantity
    })
    cart.totalPrice = totalPrice // addition the calculate total price

    if (cart.totalPriceAfterDiscount) { // shar7ha mogod ta7t
        cart.totalPriceAfterDiscount =
            (cart.totalPrice - (cart.totalPrice * cart.discount) / 100).toFixed(2);
    }
}

// create new cart and push to quantity
exports.createCart = catchAsyncError(async (req, res, next) => {

    let { price } = await productModel.findById(req.body.product).select('price')
    req.body.price = price;

    let cart = await cartModel.findOne({ user: req.user._id })
    // search to cart
    if (!cart) { // if not founded cart create new cart
        let newCart = new cartModel({ // the new cart
            cartItems: [req.body], // add cart items in cart order
            user: req.user._id   // add user id in cart order
        })
        calTotalCaertPrice(newCart) // call function to calculate total price to cart
        await newCart.save() // save cart in database
        res.status(200).json({ message: 'cart created successfily', newCart });
    } else {
        let findProduct = cart.cartItems.find((elm) => elm.product == req.body.product) // map to array of product id in cart order
        if (findProduct) {
            // if found product in last cart order => update quantity to cart order in database
            findProduct.quantity += 1
        } else {
            cart.cartItems.push(req.body) // else "push" add new product in cart order
        }
        calTotalCaertPrice(cart) // call function to calculate total price to cart
        await cart.save() // save cart in database
        res.status(200).json(cart);
    }
})


// to remove cart
exports.removePorductFromCart = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOneAndUpdate({ user: req.user._id }, { // find by user id and update quantity from any quantity to zero
        $pull: { cartItems: { _id: req.body.itemId } } // "req.body.itemId" => the id to "cart" item
        // "$pull" : to search for any address in "array" and delete it 
        // "pop" : to remove last address in "array"
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    calTotalCaertPrice(cart) // call function to calculate total price to cart
    await cart.save() // save cart in database
    !cart && next(new AppError("item not found", 400));
    cart && res.status(200).json(cart);
})


// update quantity from cart to any quantity like 14
exports.updateQuantity = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id })
    // search to cart
    let findProduct = cart.cartItems.find((elm) => elm.product == req.body.product) // map to array of product id in cart order
    if (!findProduct) return next(new AppError("product not found", 404));
    // if not found product in cart order => return error
    findProduct.quantity = req.body.quantity // but if found product in cart order update quantity
    calTotalCaertPrice(cart) // call function to calculate total price to cart
    await cart.save() // save cart in database
    res.status(200).json(cart);

})


// apply coupon to discount total Price
exports.applyCoupon = catchAsyncError(async (req, res, next) => {
    let { code, discount } = await couponModel.findOne({ code: req.body.code, expires: { $gt: Date.now() } })
    // find by code and date to expired coupon if greater than date now 
    if (!code) return next(new AppError("coupon not found or expired")); // if not found any coupon create error
    let cart = await cartModel.findOne({ user: req.user._id }) // else find user by id in token 
    cart.totalPriceAfterDiscount = (cart.totalPrice - (cart.totalPrice * discount) / 100).toFixed(2); // calculate total Price After Discount
    // "toFixed" => to show tow numbers after the correct number  
    cart.discount = discount // apply discount
    await cart.save() // save cart in database
    res.status(200).json(cart);

})


// get all carts
exports.applyCoupon = catchAsyncError(async (req, res, next) => {
    let cart = await cartModel.findOne({ user: req.user._id })
    res.status(200).json({ result: cart.cartItems.length, cart: cart.cartItems });

})