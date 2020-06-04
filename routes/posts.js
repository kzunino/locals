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

//@Route    POST /posts/comment/:id
//@desc     Comment on a post
//@access   Private

router.post('/comment/:id', auth, post_controller.post_comment);

//@Route    DELETE /posts/comment/:id/:comment_id
//@desc     Delete Comment
//@access   Private

//UPDATE COMMENT CAN STILL BE DONE
module.exports = router;
