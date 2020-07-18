// change to URI, make folder public and put URI into default.json
require('dotenv').config();

//PG_HOST = 127.0.0.1

module.exports = {
  development: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  },
  production: {
    dialect: 'postgres',
    use_env_variable:
      'postgres://bjvqvqovwpyqob:f88278fbc6ffef452220d6a2d318c8c798254a9ea48a5615462e91e613fd7a2b@ec2-34-236-215-156.compute-1.amazonaws.com:5432/d498l1h5c5rcbu',
    dialectOptions: {
      ssl: true,
    },
  },
};
