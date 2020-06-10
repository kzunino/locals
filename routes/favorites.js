const express = require('express');
const router = express.Router();
const favorites_controller = require('../controllers/favorites');
const auth = require('../middleware/auth');

//@Route    PUT /favorites
//@desc     Adds/Deletes adventure to user favorites
//@access   Private

router.get('/', auth, favorites_controller.get_favorites);

//@Route    post /favorites/:adventure_uid
//@desc     Adds/Deletes adventure to user favorites
//@access   Private

router.post('/:adventure_uid', auth, favorites_controller.add_to_favorites);

module.exports = router;
