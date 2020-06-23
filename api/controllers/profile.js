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
    res.status(400).json({errors: ['Profile not found']});
  }
});

//@Route    POST /profile
//@desc     Create or update user profile
//@access   Private

exports.update_profile = asyncHandler(async (req, res) => {
  let {
    date_of_birth,
    country,
    bio,
    languages,
    phone_number,
    gender,
    cover_photo,
    cover_photo_id,
  } = req.body;
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
    if (profile.fk_user_uid === fk_user_uid) {
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
      return res
        .json({errors: ['User is not associated with profile']})
        .status(400);
    }
  } else {
    profile = await Profile.create({
      date_of_birth,
      country,
      bio,
      languages,
      phone_number,
      gender,
      fk_user_uid,
      cover_photo,
      cover_photo_id,
    });

    profile = await Profile.findOne({
      where: {
        fk_user_uid: req.user.user_uid,
      },
      attributes: {exclude: ['createdAt', 'updatedAt']},
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });

    res.json({profile}).status(201);
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
  else res.json({errors: ['Profile not found']}).status(400);
});

// @route    DELETE /profile
// @desc     Delete profile, user & posts
// @access   Private

exports.delete_user = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.user_uid);
  if (user) {
    if (user.user_uid === req.user.user_uid) {
      await user.destroy();
      res.json({msg: 'User deleted'}).status(200);
    } else {
      res.json({errors: ['Cannot delete another user']}).status(400);
    }
  } else {
    res.json({errors: ['User not found']}).status(400);
  }
});
