const express = require('express');
const router = express.Router();
const { getUsers, getUser, createUser, updateUser, deleteUser } = require('../Controllers/Users');
const { authenticateUser, authorizePermissions } = require('../Middlewares/Auth');

router.route('/').get(authenticateUser,authorizePermissions("admin"),getUsers).post(authenticateUser,authorizePermissions("admin"),createUser);
router.route('/:id').get(authenticateUser,authorizePermissions("admin"),getUser).patch(authenticateUser,authorizePermissions("admin"),updateUser).delete(authenticateUser,authorizePermissions("admin"),deleteUser);

module.exports = router;