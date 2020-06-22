const cloudinary = require('cloudinary').v2;
const config = require('config');

cloudinary.config({
  cloud_name: config.get('cloud_name'),
  api_key: config.get('api_key'),
  api_secret: config.get('api_secret'),
});

const asyncHandler = require('../middleware/asyncHandler');

exports.upload_profile_photo = asyncHandler(async (req, res) => {
  const file = req.files.photo;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    console.log('Error: ', err);
    res.json({result});
    console.log('Result: ', result);
  });

  //console.log(file);
});
