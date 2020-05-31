const Traveler = require('../models').traveler;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {validationResult} = require('express-validator');

const asyncHandler = require('../middleware/asyncHandler');
const auth = require('../middleware/auth');

//@Route    GET /auth
//@desc     Test Route
//@access   Public

exports.get_traveler = asyncHandler(async (req, res) => {
  //returns all data minus password
  const traveler = await Traveler.findByPk(req.traveler.traveler_uid);
  //    {
  //     attributes: {exclude: [traveler.password]},
  //   });
  res.json(traveler);
});

//@Route    POST auth
//@desc     Authenticate Traveler & get token
//@access   Public

exports.sign_in = asyncHandler(async (req, res) => {
  //checks for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  const {email, password} = req.body;

  //See if user exists
  let traveler = await Traveler.findOne({
    where: {
      email,
    },
  });
  if (!traveler) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
    });
  }
  //Compares the password and matches it to encrypted password
  const isMatch = await bcrypt.compare(password, traveler.password);
  if (!isMatch) {
    return res.status(400).json({
      errors: [
        {
          msg: 'Invalid Credentials',
        },
      ],
    });
  }

  //Return jsonwebtoken
  const payload = {
    traveler: {
      traveler_uid: traveler.traveler_uid,
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
      res.json({
        token,
      });
    }
  );
});
