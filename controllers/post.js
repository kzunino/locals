const User = require('../models').users;
const Post = require('../models').post;
const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    POST /posts
//@desc     Create a post
//@access   Private
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

//@Route    GET api/posts
//@desc     Get all posts ORDER DESC from createdAt
//@access   Private

exports.get_all_posts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    order: [['createdAt', 'DESC']],
    attributes: [
      'post_uid',
      'text',
      'first_name',
      'last_name',
      'fk_user_uid',
      'createdAt',
    ],
  });
  res.json(posts);
});

//@Route    GET /posts/:id
//@desc     Get post by ID
//@access   Private

exports.get_post_by_pk = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id);
  if (post) res.json(post);
  else return res.status(404).json({msg: 'Post not found'});
});

//@Route    DELETE /posts/:id
//@desc     Delete a post
//@access   Private

exports.delete_post = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
      },
    ],
  });

  if (post.fk_user_uid === req.user.user_uid) {
    await post.destroy();
    res.status(204).end();
  } else {
    res.status(403).json({error: 'Post is not associated with user'});
  }
});
