const User = require('../models').users;
const Adventure = require('../models').adventure;
const Favorites = require('../models').favorites;
const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /favorites/
//@desc     Gets all saved favorites
//@access   Private

exports.get_favorites = asyncHandler(async (req, res) => {
  const favorites = await Favorites.findAll({
    where: {fk_user_uid: req.user.user_uid},
  });
  if (favorites) res.json(favorites).status(200);
  //else res.json({errors: ['No favorites yet!']}).status(400);
});

//@Route    POST /favorites/:adventure_uid
//@desc     Adds/Deletes adventure to user favorites
//@access   Private

exports.add_to_favorites = asyncHandler(async (req, res) => {
  //Finds favorite
  const alreadyFavorited = await Favorites.findOne({
    where: {
      fk_user_uid: req.user.user_uid,
      fk_adventure_uid: req.params.adventure_uid,
    },
  });

  //finds adventure
  const adventure = await Adventure.findByPk(req.params.adventure_uid);

  //adds to favorites if not in there
  //if like exists then unlikes the post
  if (!alreadyFavorited && adventure) {
    await Favorites.create({
      fk_user_uid: req.user.user_uid,
      fk_adventure_uid: adventure.adventure_uid,
    });

    res.status(200).send({
      msg: 'Adventure added to favorites',
    });
  } else if (!adventure) {
    res.status(400).send({errors: ['There is no adventure to be liked']});
  } else {
    await Favorites.destroy({where: {fk_user_uid: req.user.user_uid}});
    res.status(200).send({
      message: 'Adventure removed from favorites',
    });
  }
});
