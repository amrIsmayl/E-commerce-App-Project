const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { updateWishlist, removeWishlist, getUserWishlist } = require('./wishlist.service');

const router = require('express').Router();
router.use(protectedRoutes, allowedTo("user"))
router.route('/')
    .patch(updateWishlist)
    .delete(removeWishlist)
    .get(getUserWishlist)

module.exports = router;
