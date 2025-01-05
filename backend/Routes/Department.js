const express = require('express');
const router = express.Router();
const { getDepartments, getDepartment, createDepartment, updateDepartment, deleteDepartment } = require('../Controllers/Departments');
const { authenticateUser, authorizePermissions } = require('../Middlewares/Auth');

router.route('/').get(authenticateUser, authorizePermissions("admin"), getDepartments)
    .post(authenticateUser, authorizePermissions("admin"), createDepartment);

router.route('/:id').get(authenticateUser, authorizePermissions("admin"), getDepartment)
    .patch(authenticateUser, authorizePermissions("admin"), updateDepartment)
    .delete(authenticateUser, authorizePermissions("admin"), deleteDepartment);

module.exports = router;