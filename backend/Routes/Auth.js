const express = require('express');
const router = express.Router();
const {signIn,signUp,signOut,showMe} = require('../Controllers/Auth');

router.route('/signin').post(signIn);
router.route('/signup').post(signUp);
router.route('/showMe').get(showMe);
router.route('/signout').get(signOut);

module.exports = router;