const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createCart, removePorductFromCart } = require('./cart.service');

const router = require('express').Router();
router.use(protectedRoutes, allowedTo("user"))
router.route('/')
    .post(createCart)
    .delete(removePorductFromCart)
// .get(getReviews);


module.exports = router;
