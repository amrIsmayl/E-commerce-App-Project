const { allowedTo, protectedRoutes } = require('../user/user.auth');
const { createSubCategory, getSubCategories, getSubCategory, updateSubCategory, deleteSubCategory } = require('./subCategory.service');

const router = require('express').Router({ mergeParams: true });



router.route('/')
    .post(protectedRoutes, allowedTo("admin"), createSubCategory)
    .get(getSubCategories);
router.route('/:id')
    .get(getSubCategory)
    .put(protectedRoutes, allowedTo("admin"), updateSubCategory)
    .delete(protectedRoutes, allowedTo("admin"), deleteSubCategory);

module.exports = router; 