const User = require('../models').users;
const Post = require('../models').post;
const Like = require('../models').likes;
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
    include: [
      {
        model: Like,
      },
    ],
    order: [['createdAt', 'DESC']],
    attributes: [
      'post_uid',
      'text',
      'first_name',
      'last_name',
      'likeCounts',
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
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: Like,
      },
    ],
  });
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

//@Route    PUT /posts/like/:id
//@desc     Like or Unlike a post
//@access   Private

exports.like_post = asyncHandler(async (req, res) => {
  //Finds like
  const likeExists = await Like.findOne({
    where: {
      user_uid: req.user.user_uid,
      fk_post_uid: req.params.id,
    },
  });

  //finds post
  const post = await Post.findByPk(req.params.id);

  //creates like if like doesn't exist
  //if like exists then unlikes the post
  if (!likeExists && post) {
    await Like.create({
      user_uid: req.user.user_uid,
      fk_post_uid: post.post_uid,
    });
    await post.increment('likeCounts', {by: 1});
    res.status(200).send({
      msg: 'You liked this post',
    });
  } else if (!post) {
    res.status(400).send({msg: 'There is no post to be liked'});
  } else {
    await Like.destroy({where: {user_uid: req.user.user_uid}});
    await post.decrement('likeCounts', {by: 1});
    res.status(200).send({
      message: 'You unliked this post',
    });
  }
});

// created as virtual and false
//if liked.user_uid === post user_uid return true else false

//@Route    POST /posts/comment/:id
//@desc     Comment on a post
//@access   Private

exports.post_comment = asyncHandler(async (req, res) => {});
