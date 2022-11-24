const { uploadSingleFile } = require('../../utilts/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createReview, getReviews, getReview, updateReview, deleteReview } = require('./review.service');

const router = require('express').Router();



router.route('/')
    .post(protectedRoutes, allowedTo("user"), uploadSingleFile('image', 'brand'), createReview)
    .get(getReviews);

router.route('/:id')
    .get(getReview)
    .put(protectedRoutes, allowedTo("user"), uploadSingleFile('image', 'brand'), updateReview)
    .delete(protectedRoutes, allowedTo("admin", "user"), deleteReview);

module.exports = router;
