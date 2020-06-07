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

router.post('/me', auth, profile_controller.update_profile);

// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private

router.delete('/me', auth, profile_controller.delete_user);

//@Route    GET /profile
//@desc     Get all profile
//@access   Public

router.get('/', profile_controller.get_all_profiles);

// @route    GET /profile/user/:user_uid
// @desc     Get profile by user uid
// @access   Private

router.get('/user/:user_uid', auth, profile_controller.get_user);

module.exports = router;
