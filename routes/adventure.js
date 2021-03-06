const express = require('express');
const router = express.Router();
const adventure_controller = require('../controllers/adventure');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifiedUser = require('../middleware/verifiedUser');

//@Route    GET /adventure
//@desc     get adventures
//@access   Public

router.get('/', adventure_controller.get_all_adventures);

//@Route    Post /adventure/search
//@desc     Search adventure by query
//@access   Public

router.post('/search', adventure_controller.search_all_adventures);

//@Route    GET /adventure
//@desc     Get all user adventures
//@access   Private

router.get('/user/adventures', auth, adventure_controller.get_user_adventures);

//@Route    GET /adventure/featured
//@desc     Get all user adventures
//@access   Public

router.get('/featured', adventure_controller.get_featured_adventures);

//@Route    GET /adventure/:adventure_uid
//@desc     Get adventure
//@access   Public

router.get('/:adventure_uid', adventure_controller.get_adventure_by_uid);

//@Route    POST /adventure
//@desc     Post an adventure
//@access   Private & Verified

router.post(
  '/',
  auth,
  verifiedUser,
  [
    check('title', 'Please enter a title for your adventure').not().isEmpty(),
    check('description', 'Please enter a description').not().isEmpty(),
    check('languages', 'Please enter the languages you speak').not().isEmpty(),
    check('group_size', 'Please enter a maximum group size')
      .not()
      .isEmpty()
      .isInt(),
    check('street', 'Please enter a street name').not().isEmpty(),
    check('city', 'Please enter a city').not().isEmpty(),
    check('state', 'Please enter a state').not().isEmpty(),
    check('zip_code', 'Please enter a zip code').not().isEmpty().isInt(),
    check('duration', 'Please enter number of hours').not().isEmpty(),
    check('start', 'Please enter a start time').not().isEmpty(),
  ],
  adventure_controller.post_adventure
);

//@Route    PUT /adventure/:adventure_uid
//@desc     Update an adventure
//@access   Private & Verified

router.put(
  '/:adventure_uid',
  auth,
  verifiedUser,
  [
    check('title', 'Please enter a title for your adventure').not().isEmpty(),
    check('description', 'Please enter a description').not().isEmpty(),
    check('languages', 'Please enter the languages you speak').not().isEmpty(),
    check('group_size', 'Please enter a maximum group size')
      .not()
      .isEmpty()
      .isInt(),
    check('street', 'Please enter a street name').not().isEmpty(),
    check('city', 'Please enter a city').not().isEmpty(),
    check('state', 'Please enter a state').not().isEmpty(),
    check('zip_code', 'Please enter a zip code').not().isEmpty().isInt(),
    check('duration', 'Please enter number of hours as numeral')
      .not()
      .isEmpty()
      .isInt(),
    check('start', 'Please enter a start time').not().isEmpty(),
  ],
  adventure_controller.update_adventure
);

//@Route    DELETE /adventure/delete/:adventure_uid
//@desc     Delete an adventure
//@access   Private & Verified

router.delete(
  '/delete/:adventure_uid',
  auth,
  verifiedUser,
  adventure_controller.delete_adventure
);
module.exports = router;
