const { uploadSingleFile } = require('../../utilts/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createBrand, getbrands, getBrand, updateBrand, deleteBrand } = require('./brand.service');

const router = require('express').Router();



router.route('/')
    .post(protectedRoutes, allowedTo("admin"),uploadSingleFile('image', 'brand'), createBrand)
    .get(getbrands);

router.route('/:id')
    .get(getBrand)
    .put(protectedRoutes, allowedTo("admin"),uploadSingleFile('image', 'brand'), updateBrand)
    .delete(protectedRoutes, allowedTo("admin"),deleteBrand);

module.exports = router;
