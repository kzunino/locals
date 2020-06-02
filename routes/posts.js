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

//@Route    GET api/posts
//@desc     Get all posts
//@access   Private

//@Route    GET api/posts/:id
//@desc     Get post by ID
//@access   Private

//@Route    DELETE api/posts/:id
//@desc     Delete a post
//@access   Private

//@Route    PUT api/posts/like/:id
//@desc     Like a post
//@access   Private

//@Route    PUT api/posts/unlike/:id
//@desc     Unlike a post
//@access   Private

//@Route    POST api/posts/comment/:id
//@desc     Comment on a post
//@access   Private

//@Route    DELETE api/posts/comment/:id/:comment_id
//@desc     Delete Comment
//@access   Private

//UPDATE COMMENT CAN STILL BE DONE
module.exports = router;
