const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createCart } = require('./cart.service');

const router = require('express').Router();
router.use(protectedRoutes, allowedTo("user"))
router.route('/').post(createCart)
// .get(getReviews);


module.exports = router;
