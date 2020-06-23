const cloudinary = require('cloudinary').v2;
const config = require('config');
const asyncHandler = require('../middleware/asyncHandler');

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret'),
});

// POST /upload/profile_photo
//@desc     Post a user profile photo
//@access   Private

exports.upload_profile_photo = asyncHandler(async (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(
    file.tempFilePath,
    {width: 400, height: 400, crop: 'limit'},
    (err, result) => {
      console.log('Error: ', err);
      res.json({result});
      console.log('Result: ', result);
    }
  );
});

//@Route    POST /upload/delete_photo
//@desc     Deletes a user's photo
//@access   Private(file);
exports.delete_photo = asyncHandler(async (req, res) => {
  let {photo_deleted} = req.body;
  cloudinary.uploader.destroy(photo_deleted, (err, result) => {
    console.log('Error: ', err);
    res.json({result});
    console.log('Result: ', result);
  });
});
