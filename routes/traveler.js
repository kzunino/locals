const express = require('express');
const router = express.Router();
const createTraveler_controller = require('../controllers/createTraveler');
const {check} = require('express-validator');

//@Route    POST /traveler
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
  createTraveler_controller.create_traveler
);

module.exports = router;
