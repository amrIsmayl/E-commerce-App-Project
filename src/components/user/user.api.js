const { signUp, signIn } = require('./user.auth');
const { createUser, getUsers, getUser, updateUser, deleteUser, changePassword } = require('./user.service');

const router = require('express').Router();

router.route('/')
    .post(createUser)
    .get(getUsers);
router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);
router.patch('/changePassword/:id',changePassword);
router.post('/signup',signUp);
router.post('/signin',signIn)

module.exports = router;
