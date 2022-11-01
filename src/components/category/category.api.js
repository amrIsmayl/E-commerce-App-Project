const { createCategory, getCategories, getCategory, updateCategory, deleteCategory, getSubCategorys } = require('./category.service');
const subcategoryRoute = require("../subCategory/subCategory.api")
const router = require('express').Router();

// router.post('/categorise',createCategory)
// router.get('/categorise',getCategories)

router.use('/:categoryId/subcategories',subcategoryRoute)

router.route('/').post(createCategory).get(getCategories);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)

module.exports = router;










