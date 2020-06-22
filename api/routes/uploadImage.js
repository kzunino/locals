const express = require('express');
const router = express.Router();
const photo_controller = require('../controllers/upload_image');
const auth = require('../middleware/auth');

//@Route    POST /upload/profile_photo
//@desc     Post a user profile photo
//@access   Private

router.post('/profile_photo', auth, photo_controller.upload_profile_photo);

module.exports = router;
