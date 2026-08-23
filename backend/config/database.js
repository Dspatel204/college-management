const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error(
    'DATABASE_URL is not set. On Render, add a PostgreSQL database and set DATABASE_URL on this service.'
  );
}

if (databaseUrl.includes('@host:') || databaseUrl.includes('user:password@')) {
  throw new Error(
    'DATABASE_URL still has placeholder values. Replace it with your real PostgreSQL connection string.'
  );
}

const useSsl =
  process.env.NODE_ENV === 'production' ||
  /render\.com|ssl=true|sslmode=require/i.test(databaseUrl);

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: useSsl
    ? { ssl: { require: true, rejectUnauthorized: false } }
    : {},
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
