require('dotenv').config()

const {
  DB_NAME,
  DB_HOST,
  DB_USER,
  DB_PASS,
  DB_DIALECT,
  DB_ROOT_CERT,
  DB_CERT,
  DB_KEY,
} = process.env

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        sslmode: 'verify-full',
        rejectUnauthorized: false,
        key: DB_KEY,
        cert: DB_CERT,
        ca: DB_ROOT_CERT,
      },
    },
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
    dialectOptions: {
      ssl: {
        key: DB_KEY,
        cert: DB_CERT,
        ca: DB_ROOT_CERT,
      },
    },
  },
}
