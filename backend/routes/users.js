const router = require('express').Router();
const { validationUpdateUser, validationUserId, validationUpdateAvatarUser } = require('../meddlwares/validation');

const {
  getUsers, getUsersById, upDateUser, upDateUserAvatar, getUserInfo, getLogout,
} = require('../controllers/users');

router.get('/users', getUsers);

router.get('/users/me', getUserInfo);

router.get('/users/:id', validationUserId, getUsersById);

router.patch('/users/me', validationUpdateUser, upDateUser);

router.patch('/users/me/avatar', validationUpdateAvatarUser, upDateUserAvatar);

router.patch('/logout', getLogout);

module.exports = router;
