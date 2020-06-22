const User = require('../models').users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');

const asyncHandler = require('../middleware/asyncHandler');

//@Route    GET /auth
//@desc     Test Route
//@access   Public

exports.get_user = asyncHandler(async (req, res) => {
  //returns all data minus password
  console.log(req.user);
  const user = await User.findByPk(req.user.user_uid, {
    attributes: {exclude: ['password']},
  });

  res.json(user);
});

//@Route    POST auth
//@desc     Authenticate Traveler & get token
//@access   Public

exports.sign_in = asyncHandler(async (req, res) => {
  //checks for validation errors
  const errors = validationResult(req);
  // If there are validation errors...
  if (!errors.isEmpty()) {
    // Use the Array `map()` method to get a list of error messages.
    const errorMessages = errors.array().map((error) => error.msg);
    // Return the validation errors to the client.
    return res.status(400).json({errors: errorMessages});
  }
  const {email, password} = req.body;

  //See if user exists
  let user = await User.findOne({
    where: {
      email,
    },
  });
  if (!user) {
    return res.status(400).json({errors: ['Invalid Credentials']});
  }
  //Compares the password and matches it to encrypted password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({errors: ['Invalid Credentials']});
  }

  //Return jsonwebtoken
  const payload = {
    user: {
      user_uid: user.user_uid,
    },
  };
  user = await User.findOne({
    where: {
      email,
    },
    attributes: {exclude: ['password', 'createdAt', 'updatedAt']},
  });
  //put secret in config then get secret
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    {
      expiresIn: 36000,
    },
    (err, token) => {
      if (err) throw err;
      res.json({
        token,
        user,
      });
    }
  );
});

//@Route    POST /auth/verify
//@desc     Verified User
//@access   Private

exports.verify_user = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.user.user_uid);

  if (user) {
    if (!user.verified) {
      user.update({verified: 'true'});
      res.json({msg: 'User is now verified'}).status(201);
    } else {
      res.json({msg: 'User is already verified'});
    }
  } else {
    res.json({error: ['User not found!']}).status(400);
  }
});

//@Route    PUT /auth/update
//@desc     Update User Details
//@access   Private

exports.update_details = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((error) => error.msg);
    return res.status(400).json({errors: errorMessages});
  }
  const {first_name, last_name} = req.body;

  const user = await User.findByPk(req.user.user_uid);
  if (user) {
    user.update({
      first_name,
      last_name,
    });
    return res.status(200).end();
  } else {
    return res.status(400).json({errors: ['User not found']});
  }
});
