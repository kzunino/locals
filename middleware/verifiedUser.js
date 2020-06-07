const User = require('../models').users;
const Profile = require('../models').profile;
const asyncHandler = require('./asyncHandler');

export const is_verified = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      profile_uid: req.user.user_uid,
    },
  });
  if (profile) {
    if (profile.verified === true) {
      req.verified_user = true;
      next();
    } else {
      res.json({msg: 'User is not yet a verified user'});
    }
  } else {
    res.json({msg: 'Profile not found'}).status(400);
  }
});
