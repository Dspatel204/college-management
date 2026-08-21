const { Sequelize } = require('sequelize');

const validateDatabaseUrl = (url) => {
  if (!url) {
    throw new Error('DATABASE_URL is not set. Please configure it in your environment variables.');
  }
  if (url.includes('@host:') || url.includes('@localhost:') || url.includes('user:password')) {
    throw new Error('DATABASE_URL contains placeholder values. Please replace with your actual PostgreSQL connection string.');
  }
};

validateDatabaseUrl(process.env.DATABASE_URL);

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: process.env.NODE_ENV === 'production'
      ? { require: true, rejectUnauthorized: false }
      : false,
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});

module.exports = sequelize;
