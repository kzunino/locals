if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//PG_HOST = 127.0.0.1

console.log(process.env.DATABASE_URL);

const DATABASE_URL = process.env.DATABASE_URL;

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
  test: {
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    dialect: 'postgres',
    port: process.env.PG_PORT,
    operatorsAliases: 0,
  },
  production: {
    use_env_variable: DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: true,
    },
  },
};
