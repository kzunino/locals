const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/upload_image');
const auth = require('../middleware/auth');

//@Route    POST /upload/profile_photo
//@desc     Post a user profile photo
//@access   Private

router.post('/profile_photo', auth, photo_controller.upload_profile_photo);

//@Route    POST /upload/profile_cover_photo
//@desc     Post a user profile photo
//@access   Private

router.post('/profile_cover_photo', auth, photo_controller.upload_cover_photo);

//@Route    POST /upload/exp_cover_photo
//@desc     Post a user profile photo
//@access   Private

router.post('/exp_cover_photo', auth, photo_controller.upload_exp_cover_photo);

//@Route    POST /upload/delete_photo
//@desc     Deletes a user's photo
//@access   Private

router.post('/delete_photo', auth, photo_controller.delete_photo);

module.exports = router;
