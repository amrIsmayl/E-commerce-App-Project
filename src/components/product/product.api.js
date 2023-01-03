const { uploadMixOfFiles } = require('../../utilts/fileUpload');
const { protectedRoutes, allowedTo } = require('../user/user.auth');
const { createProduct, getProducts, getproduct, updateProduct, deleteProduct } = require('./product.service');

const router = require('express').Router();
let fields = [
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]
router.route('/')
    .post(protectedRoutes, allowedTo("user"), uploadMixOfFiles(fields, "product"), createProduct)
    .get(getProducts);
router.route('/:id')
    .get(getproduct)
    .put(protectedRoutes, allowedTo("admin"), uploadMixOfFiles(fields, "product"), updateProduct)
    .delete(protectedRoutes, allowedTo("admin"), deleteProduct);

module.exports = router;