const User = require('../models').users;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const asyncHandler = require('../middleware/asyncHandler');

const {validationResult} = require('express-validator');

//@Route    POST /traveler
//@desc     Create User
//@access   Public

exports.create_user = asyncHandler(async (req, res) => {
  //checks for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }

  let {email, first_name, last_name, password} = req.body;

  // See if user exists
  let user = await User.findAll({
    where: {
      email,
    },
  });
  if (user.length > 0) {
    return res.status(400).json({
      errors: [
        {
          msg: 'User already exists',
        },
      ],
    });
  }

  //Encrypt Password
  const salt = await bcrypt.genSalt(10);
  //hash password
  password = await bcrypt.hash(password, salt);

  user = await User.create({
    email,
    first_name,
    last_name,
    password,
  });

  //res.status(201).send(`User created`);

  //Return jsonwebtoken
  const payload = {
    user: {
      user_uid: user.user_uid,
    },
  };

  //put secret in config then get secret
  jwt.sign(
    payload,
    config.get('jwtSecret'),
    {
      expiresIn: 36000,
    },
    (err, token) => {
      if (err) throw err;
      res.status(201).json({
        token,
      });
    }
  );
});