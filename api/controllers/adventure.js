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
        attributes: ['first_name', 'last_name', 'avatar'],
      },
    ],
    order: [['createdAt', 'DESC']],
    exclude: ['updatedAt'],
  });
  if (adventures) res.json(adventures);
  else res.json({errors: ['No adventures found']}).status(400);
});

//@Route    GET /adventure
//@desc     Get all user adventures
//@access   Public

exports.get_user_adventures = asyncHandler(async (req, res) => {
  const adventures = await Adventure.findAll({
    where: {fk_user_uid: req.user.user_uid},
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'avatar'],
      },
    ],
    order: [['createdAt', 'DESC']],
    exclude: ['updatedAt'],
  });
  if (adventures) res.json({adventures});
  else res.json({errors: ['No adventures found']}).status(400);
});

//@Route    GET /adventure/featured
//@desc     Get five featured experiences
//@access   Public

exports.get_featured_adventures = asyncHandler(async (req, res) => {
  let featured = await Adventure.findAll({
    limit: 5,
    include: [{model: User, attributes: ['first_name', 'last_name', 'avatar']}],
  });

  if (featured) res.json({featured}).status(200);
  else res.json({msg: 'Something went wrong!'}).status(500);
});

//@Route    GET /adventure/:adventure_uid
//@desc     Get adventure
//@access   Public

exports.get_adventure_by_uid = asyncHandler(async (req, res) => {
  const adventure = await Adventure.findOne({
    where: {adventure_uid: req.params.adventure_uid},
    include: [
      {
        model: User,
        attributes: ['first_name', 'last_name', 'avatar'],
      },
      // {
      //   model: Review,
      //   attributes: ['first_name', 'review', 'rating'],
      // },
    ],
  });
  if (adventure) res.json({adventure});
  else res.json({errors: ['No adventures found']}).status(400);
});

//@Route    POST /adventure
//@desc     Post an adventure
//@access   Private & Verified

exports.post_adventure = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }

  const {
    title,
    description,
    languages,
    group_size,
    cost,
    phone_number,
    location,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    activity_type,
    included,
    recommended,
  } = req.body;

  const fk_user_uid = req.user.user_uid;

  let adventure = await Adventure.create({
    title,
    description,
    languages,
    cost,
    group_size,
    phone_number,
    location,
    street,
    city,
    state,
    zip_code,
    duration,
    start,
    activity_type,
    included,
    recommended,
    fk_user_uid,
  });

  res.json({adventure}).status(200);
});

//@Route    PUT /adventure/:adventure_uid
//@desc     Update an adventure
//@access   Private & Verified

exports.update_adventure = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }
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
      res.json({errors: ['User is not associated with this post']}).status(400);
    }
  } else {
    res.json({errors: ["Adventure doesn't exist"]}).status(400);
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
      res.json({errors: ['User is not associated with this post']}).status(400);
    }
  } else {
    res.json({errors: ["Adventure doesn't exist"]}).res.status(400);
  }
});
