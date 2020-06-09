const User = require('../models').users;
const Review = require('../models').Review;
const Adventure = require('../models').adventure;

const {validationResult} = require('express-validator');
const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /adventure
//@desc     Get all adventures
//@access   Public

exports.get_all_adventures = asyncHandler(async (req, res) => {
  const adventures = await Adventure.findAll({
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
    ],
    order: [['createdAt', 'DESC']],
    exclude: ['updatedAt'],
  });
  if (adventures) res.json(adventures);
  else res.json({msg: 'No adventures found'}).status(404);
});

//@Route    GET /adventure/:adventure_uid
//@desc     Get adventure
//@access   Public

exports.get_adventure_by_uid = asyncHandler(async (req, res) => {
  const adventure = await Adventure.findByPk(req.params.adventure_uid, {
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name'],
      },
      {
        model: Review,
        attributes: ['first_name', 'review', 'rating'],
      },
    ],
  });
  if (adventure) res.json(adventure);
  else res.json({msg: 'No adventures found'}).status(404);
});

//@Route    POST /adventure
//@desc     Post an adventure
//@access   Private & Verified

exports.post_adventure = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  const {
    title,
    description,
    languages,
    group_size,
    phone_number,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    included,
    recommended,
  } = req.body;
  const fk_user_uid = req.user.user_uid;

  const adventure = await Adventure.create({
    title,
    description,
    languages,
    group_size,
    phone_number,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    included,
    recommended,
    fk_user_uid,
  });

  res.json(adventure).status(201);
});

//@Route    PUT /adventure/:adventure_uid
//@desc     Update an adventure
//@access   Private & Verified

exports.update_adventure = asyncHandler(async (req, res) => {
  const adventure = await Adventure.findByPk(req.params.adventure_uid);
  const {
    title,
    description,
    languages,
    group_size,
    phone_number,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    included,
    recommended,
  } = req.body;

  if (adventure) {
    if (adventure.fk_user_uid === req.user.user_uid) {
      adventure.update({
        title,
        description,
        languages,
        group_size,
        phone_number,
        street,
        city,
        state,
        zip_code,
        duration,
        start,
        included,
        recommended,
      });
      res.json({msg: 'Adventure updated'}).status(200);
    } else {
      res.json({msg: 'User is not associated with this post'}).status(401);
    }
  } else {
    res.json({msg: "Adventure doesn't exist"}).status(404);
  }
});

//@Route    DELETE /adventure/:adventure_uid
//@desc     Delete an adventure
//@access   Private & Verified

exports.delete_adventure = asyncHandler(async (req, res) => {
  const adventure = await Adventure.findByPk(req.params.adventure_uid);
  if (adventure) {
    if (adventure.fk_user_uid === req.user.user_uid) {
      adventure.destroy();
      res.json({msg: 'Adventure deleted'});
    } else {
      res.json({msg: 'User is not associated with this post'}).status(401);
    }
  } else {
    res.json({msg: "Adventure doesn't exist"}).res.status(404);
  }
});
