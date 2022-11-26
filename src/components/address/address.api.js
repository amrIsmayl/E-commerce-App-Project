const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { updateAddress, removeAddress, getUserAddress } = require('./address.service');

const router = require('express').Router();
router.use(protectedRoutes, allowedTo("user"))
router.route('/')
    .patch(updateAddress)
    .delete(removeAddress)
    .get(getUserAddress)

module.exports = router;
