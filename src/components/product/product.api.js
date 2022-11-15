const { uploadMixOfFiles } = require('../../utilts/fileUpload');
const { createProduct, getProducts, getproduct, updateProduct, deleteProduct } = require('./product.service');

const router = require('express').Router();
let fields = [
    { name: 'imageCover', maxCount: 1 },
    { name: 'images', maxCount: 3 }
]
router.route('/').post(uploadMixOfFiles(fields, "product"), createProduct).get(getProducts);
router.route('/:id').get(getproduct).put(uploadMixOfFiles(fields, "product"), updateProduct).delete(deleteProduct);

module.exports = router;