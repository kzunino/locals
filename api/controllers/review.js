const User = require('../models').users;
const Review = require('../models').review;
const Adventure = require('../models').adventure;

const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /review/user/:user_uid
//@desc     Get User Reviews
//@access   Public

exports.get_all_user_reviews = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      fk_user_uid: req.params.user_uid,
    },
  });

  if (reviews) {
    res.json(reviews).status(200);
  } else {
    res.json({errors: ['No reviews found']}).status(400);
  }
});

//@Route    GET /review/adventure/:adventure_uid
//@desc     Get Adventure Reviews
//@access   Public

exports.get_all_adventure_reviews = asyncHandler(async (req, res) => {
  const reviews = await Review.findAll({
    where: {
      fk_adventure_uid: req.params.adventure_uid,
    },
    include: [{model: User, attributes: ['avatar']}],
  });

  if (reviews) {
    res.json(reviews).status(200);
  } else {
    res.json({msg: ['No reviews found']}).status(404);
  }
});

//@Route    POST /review/:adventure_uid
//@desc     Post a user review
//@access   Private

exports.post_review = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password', 'last_name', 'updatedAt', 'email']},
  });

  const adventure = await Adventure.findByPk(req.params.adventure_uid);

  if (user) {
    if (adventure) {
      const review = await Review.create({
        first_name: user.first_name,
        review: req.body.review,
        rating: req.body.rating,
        fk_user_uid: req.user.user_uid,
        fk_adventure_uid: req.params.adventure_uid,
        host_adventure_uid: adventure.fk_user_uid,
      });
      res.json(review).status(201);
    } else {
      res.json({errors: ['Adventure not found']}).status(400);
    }
  } else {
    res.json({errors: ['User not found']}).status(400);
  }
});

//@Route    PUT /review/:review_uid
//@desc     Update a user review
//@access   Private

exports.update_review = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.review_uid);

  if (review) {
    if (review.fk_user_uid === req.user.user_uid) {
      await review.update({
        review: req.body.review,
        rating: req.body.rating,
      });
      res.json(review).status(201);
    } else {
      res.json({errors: ['User is not associated with review']}).status(400);
    }
  } else {
    res.json({errors: ['Review is not found']}).status(400);
  }
});

//@Route    DELETE /review/:review_uid
//@desc     Delete a review
//@access   Private

exports.delete_review = asyncHandler(async (req, res) => {
  const review = await Review.findByPk(req.params.review_uid);

  if (review) {
    if (review.fk_user_uid === req.user.user_uid) {
      await review.destroy();
      res.status(201).end();
    } else {
      res.json({errors: ['User is not associated with review']}).status(400);
    }
  } else {
    res.json({errors: ['Review is not found']}).status(400);
  }
});
