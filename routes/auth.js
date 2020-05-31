const express = require('express');
const router = express.Router();
const traveler_sign_in_controller = require('../controllers/authTraveler');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//@Route    GET api/auth
//@desc     Test Route
//@access   Public
router.get('/', auth, traveler_sign_in_controller.get_traveler);

//@Route    GET api/auth
//@desc     Authenticate User & get token
//@access   Public

router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  traveler_sign_in_controller.sign_in
);

module.exports = router;
