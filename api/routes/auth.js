const express = require('express');
const router = express.Router();
const authUser_controller = require('../controllers/authUser');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//@Route    GET /auth
//@desc     Test Route
//@access   Public
router.get('/', auth, authUser_controller.get_user);

//@Route    POST /auth
//@desc     Authenticate User & get token
//@access   Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists().not().isEmpty(),
  ],
  authUser_controller.sign_in
);

//@Route    POST /auth/verify
//@desc     Verified User
//@access   Private

router.post('/verify', auth, authUser_controller.verify_user);

module.exports = router;
