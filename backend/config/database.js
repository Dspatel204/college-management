const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('⚠️ WARNING: DATABASE_URL is not set. Database operations will fail until DATABASE_URL is configured.');
}

if (databaseUrl && (databaseUrl.includes('@host:') || databaseUrl.includes('user:password@'))) {
  console.warn('⚠️ WARNING: DATABASE_URL contains placeholder values. Replace it with your real PostgreSQL connection string.');
}

// Render internal URLs (e.g. postgres://user:pass@dpg-xxx-a:5432/db) don't support SSL.
// External URLs (e.g. *.render.com, supabase, neon) require SSL with rejectUnauthorized: false.
const isInternalRender = Boolean(
  databaseUrl &&
  databaseUrl.includes('dpg-') &&
  !databaseUrl.includes('.render.com')
);

const isLocalhost = Boolean(
  databaseUrl &&
  (databaseUrl.includes('localhost') || databaseUrl.includes('127.0.0.1'))
);

let useSsl = false;
if (process.env.DB_SSL === 'true') {
  useSsl = true;
} else if (process.env.DB_SSL === 'false') {
  useSsl = false;
} else if (databaseUrl) {
  if (isInternalRender || isLocalhost) {
    useSsl = false;
  } else if (
    process.env.NODE_ENV === 'production' ||
    /render\.com|neon\.tech|supabase\.co|ssl=true|sslmode=require/i.test(databaseUrl)
  ) {
    useSsl = true;
  }
}

const sequelize = new Sequelize(databaseUrl || 'postgres://postgres:postgres@localhost:5432/college_db', {
  dialect: 'postgres',
  dialectOptions: {
    connectTimeout: 30000,
    ...(useSsl
      ? {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        }
      : {}),
  },
  logging: process.env.NODE_ENV === 'development' ? console.log : false,
  pool: {
    max: parseInt(process.env.DB_POOL_MAX || '10', 10),
    min: 0,
    acquire: 45000,
    idle: 10000,
  },
});

module.exports = sequelize;

