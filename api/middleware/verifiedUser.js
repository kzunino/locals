const User = require('../models').users;

module.exports = async (req, res, next) => {
  const user = await User.findByPk(req.user.user_uid);
  if (user) {
    if (user.verified === true) {
      //req.user.verified_user = true;
      next();
    } else {
      res.json({msg: 'User is not yet a verified user'});
    }
  } else {
    res.json({msg: 'User not found'}).status(404);
  }
};
