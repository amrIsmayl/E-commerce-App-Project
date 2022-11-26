const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createReview, getReviews, getReview, updateReview, deleteReview } = require('./review.service');

const router = require('express').Router();
router.route('/')
    .post(protectedRoutes, allowedTo("user"), createReview)
    .get(getReviews);

router.route('/:id')
    .get(getReview)
    .put(protectedRoutes, allowedTo("user"), updateReview)
    .delete(protectedRoutes, allowedTo("admin","user"), deleteReview);

module.exports = router;
