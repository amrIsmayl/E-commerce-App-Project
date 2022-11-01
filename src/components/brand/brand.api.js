const { createBrand, getBrand, updateBrand, deleteBrand } = require('./brand.service');

const router = require('express').Router();

// router.post('/categorise',createCategory)
// router.get('/categorise',getCategories)

router.route('/').post(createBrand)
router.route('/:id').get(getBrand).put(updateBrand).delete(deleteBrand)

module.exports = router;