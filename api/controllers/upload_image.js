const cloudinary = require('cloudinary').v2;
const User = require('../models').users;

const config = require('config');
const asyncHandler = require('../middleware/asyncHandler');

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret'),
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
    res.json({msg: 'User not found!'});
  }

  const file = req.files.photo;
  cloudinary.uploader.upload(
    file.tempFilePath,
    {width: 400, height: 400, crop: 'limit'},
    (err, result) => {
      console.log('Error: ', err);
      user.update({
        avatar: result.url,
        avatar_id: result.public_id,
      });
      res.json({user, result}).status(200);
      console.log('Result: ', result);
    }
  );
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
