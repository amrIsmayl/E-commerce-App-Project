const { createCategory, getCategories, getCategory, updateCategory, deleteCategory } = require('./category.service');

const router = require('express').Router();

// router.post('/categorise',createCategory)
// router.get('/categorise',getCategories)

router.route('/').post(createCategory).get(getCategories);
router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory)

module.exports = router;










