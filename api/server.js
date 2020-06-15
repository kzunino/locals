const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const path = require('path');
const models = require('./models');

// variable to enable global error logging
const enableGlobalErrorLogging =
  process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// Enable All CORS Requests
app.use(cors());

//Init Middleware
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

//Friendly Start Message
app.get('/', (req, res) => res.send('API Running'));

//Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/profile', require('./routes/profile'));
app.use('/adventure', require('./routes/adventure'));
app.use('/review', require('./routes/review'));
app.use('/favorites', require('./routes/favorites'));

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  console.log('I am catching the error');
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(501).json({
      errors: ['Email for user already exists'],
    });
  }
  // if (err.name === 'SequelizeDatabaseError') {
  //   return res.status(404).json({errors: 'Oh no! Page not found.'});
  // }
  res.status(err.status || 500).json({
    message: err.message,
    name: err.name,
    error: {},
  });
});

//Sets Port and Listens
const PORT = process.env.PORT || 5000;
return models.sequelize.sync().then((result) => {
  app.listen(PORT, () => {
    console.log(`App running on port ${PORT}.`);
  });
});