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
            cartItems: [req.body], // add cart items in cart order
            user: req.user._id   // add user id in cart order
        })
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
        await cart.save() // save cart in database
        res.status(200).json(cart);
    }
})



// to remove cart
exports.removePorductFromCart = catchAsyncError(async (req, res, next) => {
    let { cartItems } = await cartModel.findOneAndUpdate({ user: req.user._id }, { // find by user id and update quantity from any quantity to zero
        $pull: { cartItems: { _id: req.body.itemId } } // "req.body.itemId" => the id to "cart" item
        // "$pull" : to search for any address in "array" and delete it 
        // "pop" : to remove last address in "array"
    }, { new: true });
    // el new 3shan ===> show data befor update category because by default they show data after update
    !cartItems && next(new AppError("item not found", 400));
    cartItems && res.status(200).json(cartItems);
})