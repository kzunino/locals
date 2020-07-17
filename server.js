const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const PORT = process.env.PORT || 5000;

const upload = require('express-fileupload');
app.use(upload({useTempFiles: true}));

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

//app.use(express.static('client/build'));

//if running in production mode then it serves static files from build in client
if (process.env.NODE_ENV === 'production') {
  //points to index.js in client
  app.use(express.static(path.join(__dirname, 'client/build')));
}

//Friendly Start Message
//app.get('/', (req, res) => res.send('API Running'));

//Routes
app.use('/users', require('./routes/users'));
app.use('/auth', require('./routes/auth'));
app.use('/posts', require('./routes/posts'));
app.use('/profile', require('./routes/profile'));
app.use('/adventure', require('./routes/adventure'));
app.use('/review', require('./routes/review'));
app.use('/favorites', require('./routes/favorites'));
app.use('/upload', require('./routes/uploadImage'));

//catch all method redirects to build folder
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client/build', 'index.html'));
});

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
    return res.status(400).json({
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
return models.sequelize.sync().then((result) => {
  app.listen(process.env.PORT || 5000, () => {
    console.log(`App running on port ${process.env.PORT || 5000}.`);
  });
});
