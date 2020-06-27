const express = require('express');
const router = express.Router();
const {check} = require('express-validator');
const post_controller = require('../controllers/post');
const auth = require('../middleware/auth');

//@Route    POST /posts
//@desc     Create a post
//@access   Private

router.post(
  '/',
  [auth, [check('text', 'Text is required').not().isEmpty()]],
  post_controller.create_post
);

//@Route    GET /posts
//@desc     Get all posts
//@access   Private

router.get('/', auth, post_controller.get_all_posts);

//@Route    GET /posts/:id
//@desc     Get post by ID
//@access   Private

router.get('/:id', auth, post_controller.get_post_by_pk);

//@Route    DELETE /posts/:id
//@desc     Delete a post
//@access   Private

router.delete('/:id', auth, post_controller.delete_post);

//@Route    PUT /posts/like/:id
//@desc     Like or Unlikes a post
//@access   Private

router.put('/like/:id', auth, post_controller.like_post);

//@Route    PUT posts/:id
//@desc     Update Post
//@access   Private

router.put(
  '/:id',
  auth,
  [check('text', 'Text is required').notEmpty()],
  post_controller.update_post
);

//@Route    POST /posts/comment/:id
//@desc     Comment on a post
//@access   Private

router.post(
  '/comment/:id',
  auth,
  [check('comment_text', 'Text is required').notEmpty()],
  post_controller.post_comment
);

//@Route    PUT /posts/comment/:id
//@desc     Update a comment
//@access   Private

router.put(
  '/comment/:comment_id',
  [auth, [check('text', 'Text is required').notEmpty()]],
  post_controller.update_comment
);

//@Route    PUT /posts/comment/like/:comment_id
//@desc     Like/Unlike Comment
//@access   Private

router.put('/comment/like/:comment_id', auth, post_controller.like_comment);

//@Route    DELETE /posts/comment/:id/:comment_id
//@desc     Delete Comment
//@access   Private

router.delete('/comment/:comment_id', auth, post_controller.delete_comment);

module.exports = router;
