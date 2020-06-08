const express = require('express');
const router = express.Router();
const adventure_controller = require('../controllers/adventure');
const {check} = require('express-validator');
const auth = require('../middleware/auth');
const verifiedUser = require('../middleware/verifiedUser');

//@Route    GET /adventure
//@desc     Post an adventure
//@access   Public

router.get('/', adventure_controller.get_all_adventures);

//@Route    POST /adventure
//@desc     Post an adventure
//@access   Private & Verified

router.post(
  '/',
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
    check('duration', 'Please enter number of hours').not().isEmpty().isInt(),
    check('start', 'Please enter a start time').not().isEmpty(),
  ],
  auth,
  verifiedUser,
  adventure_controller.post_adventure
);

//@Route    PUT /adventure/:adventure_uid
//@desc     Update an adventure
//@access   Private & Verified

router.put(
  '/:adventure_uid',
  auth,
  verifiedUser,
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
