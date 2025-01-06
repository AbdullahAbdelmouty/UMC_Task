const express = require('express');
const router = express.Router();
const {getEmployee,getEmployees,createEmployee,deleteEmployee,updateEmployee} = require('../Controllers/Employee');
const { authenticateUser, authorizePermissions } = require('../Middlewares/Auth');

router.route('/').get(authenticateUser,authorizePermissions("admin"),getEmployees)
.post(authenticateUser,authorizePermissions("admin"),createEmployee);

router.route('/:id').get(authenticateUser,authorizePermissions("admin"),getEmployee)
.patch(authenticateUser,authorizePermissions("admin"),updateEmployee)
.delete(authenticateUser,authorizePermissions("admin"),deleteEmployee);

module.exports = router;
