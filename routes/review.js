const express = require('express');
const router = express.Router();
const review_controller = require('../controllers/review');
const {check} = require('express-validator');
const auth = require('../middleware/auth');

//@Route    GET /review/user/:user_uid
//@desc     Get User Reviews
//@access   Public

router.get('/user/:user_uid', review_controller.get_all_user_reviews);

//@Route    GET /review/adventure/:adventure_uid
//@desc     Get Adventure Reviews
//@access   Public

router.get(
  '/adventure/:adventure_uid',
  review_controller.get_all_adventure_reviews
);

//@Route    POST /review/:adventure_uid
//@desc     Post a user review
//@access   Private

router.post(
  '/:adventure_uid',
  auth,
  [
    check('review', "Please don't leave review blank").not().isEmpty(),
    check('rating', 'Please rate this experience between 1 and 5')
      .not()
      .isEmpty()
      .isInt({min: 1, max: 5}),
  ],
  review_controller.post_review
);

//@Route    PUT /review/:review_uid
//@desc     Post a user review
//@access   Private

router.put(
  '/:review_uid',
  auth,
  [
    check('review', "Please don't leave review blank").not().isEmpty(),
    check('rating', 'Please rate this experience between 1 and 5')
      .not()
      .isEmpty()
      .isInt({min: 1, max: 5}),
  ],
  review_controller.update_review
);

//@Route    DELETE /review/:review_uid
//@desc     Post a user review
//@access   Private

router.delete('/:review_uid', auth, review_controller.delete_review);

module.exports = router;
