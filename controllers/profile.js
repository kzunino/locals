const User = require('../models').users;
const Profile = require('../models').profile;

//const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /profile/me
//@desc     Get Current User's profile
//@access   Private

exports.get_my_profile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      fk_user_uid: req.user.user_uid,
    },
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
    ],
  });
  if (profile) {
    res.status(200).json({profile});
  } else {
    res.status(400).json({msg: 'Profile not found'});
  }
});

//@Route    POST /profile
//@desc     Create or update user profile
//@access   Private

exports.update_profile = asyncHandler(async (req, res) => {
  let {date_of_birth, country, bio, languages, phone_number, gender} = req.body;
  const fk_user_uid = req.user.user_uid;

  // If no value insert null
  date_of_birth ? date_of_birth : (date_of_birth = null);
  country ? country : (country = null);
  bio ? bio : (bio = null);
  languages ? languages : (languages = null);
  phone_number ? phone_number : (phone_number = null);
  gender ? gender : (gender = null);

  //find by user uid
  let profile = await Profile.findOne({
    where: {
      fk_user_uid: req.user.user_uid,
    },
  });
  //if profile exists, update it

  if (profile) {
    profile = await profile.update({
      date_of_birth,
      country,
      bio,
      languages,
      phone_number,
      gender,
    });
    return res.json({msg: 'Profile Updated'}).status(200);
  } else {
    profile = await Profile.create({
      date_of_birth,
      country,
      bio,
      languages,
      phone_number,
      gender,
      fk_user_uid,
    });
    res.status(201).end();
  }
});

//@Route    GET /profile
//@desc     Get all profile
//@access   Public
exports.get_all_profiles = asyncHandler(async (req, res) => {
  const profiles = await Profile.findAll({
    include: {
      model: User,
      attributes: ['first_name', 'last_name'],
    },
  });
  if (profiles) res.json({profiles});
});

// @route    GET /profile/user/:user_uid
// @desc     Get profile by user uid
// @access   Private

exports.get_user = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      fk_user_uid: req.params.user_uid,
    },
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
    ],
  });

  if (profile) res.json(profile);
  else res.json({msg: 'Profile not found'});
});

// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private

exports.delete_user = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.user_uid);
  if (user) {
    await user.destroy();
    res.json({msg: 'User deleted'});
  } else {
    res.json({msg: 'User not found'});
  }
});
