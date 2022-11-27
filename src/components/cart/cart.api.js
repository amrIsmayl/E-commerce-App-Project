const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createCart, removePorductFromCart, updateQuantity, applyCoupon } = require('./cart.service');

const router = require('express').Router();
router.use(protectedRoutes, allowedTo("user"))
router.route('/')
    .post(createCart)
    .delete(removePorductFromCart)
    .put(updateQuantity)
    .get(applyCoupon)

router.post("/applyCoupon", applyCoupon);
module.exports = router;
