const cloudinary = require('cloudinary').v2;
const User = require('../models').users;
const Profile = require('../models').profile;
const Adventure = require('../models').adventure;
if (process.env.NODE_ENV !== 'production') require('dotenv').config();

//const config = require('config');
const asyncHandler = require('../middleware/asyncHandler');

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.api_secret,
});

// POST /upload/profile_photo
//@desc     uploads a user's profile photo and deletes old one
//@access   Private

exports.upload_profile_photo = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password']},
  });
  if (user) {
    if (user.avatar !== null && user.avatar_id !== null) {
      cloudinary.uploader.destroy(user.avatar_id, (err, result) => {
        console.log('Error: ', err);
        //res.json({result});
        console.log('Result: ', result);
      });
    }
  } else {
    return res.json({msg: 'User not found!'});
  }

  const file = req.files.photo;
  cloudinary.uploader.upload(
    file.tempFilePath,
    {width: 800, height: 800, crop: 'fill'},
    (err, result) => {
      console.log('Error: ', err);
      user.update({
        avatar: result.url,
        avatar_id: result.public_id,
      });
      console.log('Result: ', result);
      return res.json({user, result}).status(200);
    }
  );
});

// POST /upload/cover_photo
//@desc     uploads a user's profile photo and deletes old one
//@access   Private

exports.upload_cover_photo = asyncHandler(async (req, res) => {
  let profile = await Profile.findOne(
    {
      where: {
        fk_user_uid: req.user.user_uid,
      },
    },
    {
      attributes: {include: ['cover_photo', 'cover_photo_id']},
    }
  );
  if (profile) {
    if (profile.cover_photo !== null && profile.cover_photo_id !== null) {
      cloudinary.uploader.destroy(profile.cover_photo_id, (err, result) => {
        console.log('Error: ', err);
        //res.json({result});
        console.log('Result: ', result);
      });
    }
  } else {
    return res.json({msg: 'Profile not found!'});
  }

  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log('Error: ', err);
    profile.update({
      cover_photo: result.url,
      cover_photo_id: result.public_id,
    });
    console.log('Result: ', result);
    return res.json({result}).status(200);
  });
});

// POST /upload/exp_cover_photo
//@desc     uploads a experience photo & deletes the old one
//@access   Private

exports.upload_exp_cover_photo = asyncHandler(async (req, res) => {
  let adventure = await Adventure.findOne(
    {
      where: {
        fk_user_uid: req.user.user_uid,
      },
    },
    {
      attributes: {include: ['cover_photo', 'cover_photo_id']},
    }
  );
  if (adventure) {
    if (adventure.cover_photo !== null && adventure.cover_photo_id !== null) {
      cloudinary.uploader.destroy(adventure.cover_photo_id, (err, result) => {
        console.log('Error: ', err);
        //res.json({result});
        console.log('Result: ', result);
      });
    }
  } else {
    return res.json({msg: 'Profile not found!'});
  }

  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log('Error: ', err);
    adventure.update({
      cover_photo: result.url,
      cover_photo_id: result.public_id,
    });
    console.log('Result: ', result);
    return res.json({result}).status(200);
  });
});

//@Route    POST /upload/delete_photo
//@desc     Deletes a user's photo
//@access   Private(file);
exports.delete_photo = asyncHandler(async (req, res) => {
  let user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password']},
  });
  if (user) {
    if (user.avatar !== null && user.avatar_id !== null) {
      cloudinary.uploader.destroy(user.avatar_id, (err, result) => {
        console.log('Error: ', err);
        res.json({result});
        console.log('Result: ', result);
      });
    }
  } else res.json({msg: 'User not found'}).status(400);
});

// //look up user to replace profile photo if exists
// let user = await User.findByPk(req.user.user_uid, {
//     attributes: {exclude: ['password']},
//   });

//   if (user) {
//     if (user.avatar !== null && user.avatar_id !== null) {
//       cloudinary.uploader.destroy(user.avatar_id, (err, result) => {
//         console.log('Error: ', err);
//         //res.json({result});

//         console.log('Result: ', result);
//       });
//     }
//     console.log(cloudinaryResult);
//     user.update({
//       avatar: cloudinaryResult.url,
//       avatar_id: cloudinaryResult.public_id,
//     });
//     res.json({user}).status(200);
//   } else {
//     res.json({msg: 'User not found!'});
//   }
