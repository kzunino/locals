const User = require('../models').users;
const Post = require('../models').post;
const PostLike = require('../models').post_likes;
const Comment = require('../models').comment;
const CommentLike = require('../models').comment_likes;
const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    POST /posts
//@desc     Create a post
//@access   Private
exports.create_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
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

  res.json({post}).status(201);
});

//@Route    GET api/posts
//@desc     Get all posts ORDER DESC from createdAt
//@access   Private

exports.get_all_posts = asyncHandler(async (req, res) => {
  const posts = await Post.findAll({
    include: [
      {
        model: User,
        attributes: ['avatar'],
      },
      {
        model: PostLike,
      },
      {
        model: Comment,
        include: [
          {
            model: CommentLike,
          },
        ],
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

  res.json({posts});
});

//@Route    GET /posts/:id
//@desc     Get post by ID
//@access   Private

exports.get_post_by_pk = asyncHandler(async (req, res) => {
  const post = await Post.findByPk(req.params.id, {
    include: [
      {
        model: User,
        attributes: ['avatar'],
      },
      {
        model: PostLike,
      },
      {
        model: Comment,
        include: [
          {
            model: User,
            attributes: ['avatar'],
          },
          {
            model: CommentLike,
          },
        ],
      },
    ],
  });
  if (post) return res.json({post});
  else return res.status(400).json({errors: ['Post not found']});
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

  if (post) {
    if (post.fk_user_uid === req.user.user_uid) {
      await post.destroy();
      res.status(204).end();
    } else {
      return res.status(400).json({errors: ['Post not associated with user']});
    }
  } else {
    return res.status(400).json({errors: ['Post not found']});
  }
});

//@Route    PUT /posts/like/:id
//@desc     Like or Unlike a post
//@access   Private

exports.like_post = asyncHandler(async (req, res) => {
  //Finds like
  const likeExists = await PostLike.findOne({
    where: {
      user_uid: req.user.user_uid,
      fk_post_uid: req.params.id,
    },
  });

  //finds post
  const post = await Post.findByPk(req.params.id);

  if (likeExists) {
    await PostLike.destroy({where: {user_uid: req.user.user_uid}});
    await post.decrement('likeCounts', {by: 1});
    return res.status(200).send({
      message: 'You unliked this post',
    });
  }
  //creates like if like doesn't exist
  //if like exists then unlikes the post
  else if (!likeExists && post) {
    await PostLike.create({
      user_uid: req.user.user_uid,
      fk_post_uid: post.post_uid,
    });
    await post.increment('likeCounts', {by: 1});
    res.status(200).send({
      msg: 'You liked this post',
    });
  } else if (!post) {
    res.status(400).send({errors: ['There is no post to be liked']});
  }
});

//@Route    PUT /posts/:id
//@desc     Update Post
//@access   Private

exports.update_post = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }
  const post = await Post.findByPk(req.params.id);

  if (post) {
    if (post.fk_user_uid === req.user.user_uid) {
      post.update({text: req.body.text});
      res.json(post);
    } else {
      return res.status(400).json({errors: ['Post not associated with user']});
    }
  } else {
    return res.status(400).json({errors: ['Post not found']});
  }
});

//@Route    POST /posts/comment/:id
//@desc     Comment on a post
//@access   Private

exports.post_comment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }

  //find user and remove password
  const user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password']},
  });

  const post = await Post.findByPk(req.params.id);

  //instantiate a new post from request and user
  let comment = await Comment.create({
    comment_text: req.body.comment_text,
    first_name: user.first_name,
    last_name: user.last_name,
    fk_user_uid: user.user_uid,
    fk_post_uid: post.post_uid,
  });

  let comment_uid = comment.comment_uid;
  comment = await Comment.findByPk(comment_uid, {
    include: [
      {
        model: User,
        attributes: ['avatar'],
      },
      {
        model: CommentLike,
      },
    ],
  });

  return res.json({comment}).status(200);
});

//@Route    DELETE posts/comment/:comment_id
//@desc     Delete Comment
//@access   Private

exports.delete_comment = asyncHandler(async (req, res) => {
  const comment = await Comment.findByPk(req.params.comment_id, {
    include: [
      {
        model: User,
      },
    ],
  });

  if (comment) {
    if (comment.fk_user_uid === req.user.user_uid) {
      await comment.destroy();
      res.status(204).end();
    } else {
      res.status(400).json({errors: ['Comment is not found']});
    }
  } else {
    res.status(400).json({errors: ['Post is not associated with user']});
  }
});

//@Route    PUT /posts/comment/:id
//@desc     Update a comment
//@access   Private

exports.update_comment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }
  const comment = await Comment.findByPk(req.params.comment_id);

  if (comment) {
    if (comment.fk_user_uid === req.user.user_uid) {
      comment.update({comment_text: req.body.text});
      res.json({comment});
    } else {
      return res
        .status(400)
        .json({errors: ['Comment not associated with user']});
    }
  } else {
    return res.status(400).json({errors: ['Comment not found']});
  }
});

//@Route    PUT /posts/comment/like/:comment_id
//@desc     Like/Unlike Comment
//@access   Private

exports.like_comment = asyncHandler(async (req, res) => {
  //Finds like
  const likeExists = await CommentLike.findOne({
    where: {
      user_uid: req.user.user_uid,
      fk_comment_uid: req.params.comment_id,
    },
  });

  //finds post
  const comment = await Comment.findByPk(req.params.comment_id);

  if (likeExists) {
    await CommentLike.destroy({where: {user_uid: req.user.user_uid}});
    await comment.decrement('likeCounts', {by: 1});
    return res.status(200).send({
      message: 'You unliked this comment',
    });
  }

  //creates like if like doesn't exist
  //if like exists then unlikes the post
  if (!likeExists && comment) {
    await CommentLike.create({
      user_uid: req.user.user_uid,
      fk_comment_uid: comment.comment_uid,
    });
    await comment.increment('likeCounts', {by: 1});
    res.status(200).send({
      msg: 'You liked this comment',
    });
  } else if (!comment) {
    res.status(400).send({errors: ['There is no comment to be liked']});
  }
});
