const express = require('express');
const router = express.Router();
const profile_controller = require('../controllers/profile');
//const {check} = require('express-validator');
const auth = require('../middleware/auth');

//@Route    GET /profile/me
//@desc     Get Current User's profile
//@access   Private

router.get('/me', auth, profile_controller.get_my_profile);

//@Route    POST /profile
//@desc     Create or update user profile
//@access   Private

router.post('/', auth, profile_controller.update_profile);

//@Route    GET /profile
//@desc     Get all profile
//@access   Private

// @route    GET /profile/user/:user_uid
// @desc     Get profile by user id
// @access   Private

// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private
module.exports = router;
