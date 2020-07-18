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
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    use_env_variable: process.env.DATABASE_URL,
    dialectOptions: {
      ssl: true,
    },
  },
};
