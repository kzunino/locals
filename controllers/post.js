const User = require('../models').users;
const Post = require('../models').post;
const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

exports.create_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  //find user and remove password
  const user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password']},
  });

  //instantiate a new post from request and user
  const post = await Post.create({
    text: req.body.text,
    first_name: user.first_name,
    last_name: user.last_name,
    fk_user_uid: user.user_uid,
  });

  res.json(post).status(201);
});
