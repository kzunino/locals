if (process.env.NODE_ENV !== 'production') require('dotenv').config();
//PG_HOST = 127.0.0.1

process.env.DATABASE_URL =
  'postgres://wivdzorewkoeux:fecba625a2241b5a907d977a89e9067122c9d37dd8c0cd2bd2da093a00d8ccca@ec2-34-192-173-173.compute-1.amazonaws.com:5432/dgclfg4j2fv4r';
console.log(process.env.DATABASE_URL);

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
    use_env_variable: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
      },
    },
  },
};
