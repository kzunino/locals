const express = require('express');
const router = express.Router();
const createUser_controller = require('../controllers/createUser');
const {check} = require('express-validator');

//@Route    POST /users
//@desc     Create User
//@access   Public
router.post(
  '/',
  [
    check('first_name', 'Please enter a first name').not().isEmpty(),
    check('last_name', 'Please enter a last name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({min: 6}),
  ],
  createUser_controller.create_user
);

module.exports = router;
