const User = require('../models').users;
const Profile = require('../models').profile;
//const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /profile/me
//@desc     Get Current User's profile
//@access   Private

exports.get_my_profile = asyncHandler(async (req, res) => {
  const profile = await Profile.findByPk(req.user.user_uid, {
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
  const {
    date_of_birth,
    country,
    bio,
    languages,
    phone_number,
    gender,
    verified,
  } = req.body;
  const fk_user_uid = req.user.user_uid;

  //   const profileFields = {};
  //   //profileFields.user = req.user.user_uid;
  //   date_of_birth ? (profileFields.date_of_birth = date_of_birth) : null;
  //   country ? (profileFields.country = country) : null;
  //   bio ? (profileFields.bio = bio) : null;
  //   languages ? (profileFields.languages = languages) : null;
  //   phone_number ? (profileFields.phone_number = phone_number) : null;
  //   gender ? (profileFields.gender = gender) : null;
  //   verified ? (profileFields.verified = verified) : null;

  //   //find by user uid
  //   let profile = await Profile.findByPk(req.user.user_uid);
  //   //if profile exists, update it
  //   if (profile) {
  //     await Profile.update({
  //       profileFields,
  //     });
  //     return res.json({profile}).status(200);
  //   } else {
  profile = await Profile.create({
    date_of_birth,
    country,
    bio,
    languages,
    phone_number,
    gender,
    verified,
    fk_user_uid,
  });
  res.status(201).end();
  //   }
});
