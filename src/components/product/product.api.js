const { createProduct, getProducts, getproduct, updateProduct, deleteProduct } = require('./product.service');

const router = require('express').Router();



router.route('/').post(createProduct).get(getProducts);
router.route('/:id').get(getproduct).put(updateProduct).delete(deleteProduct);

module.exports = router; 

