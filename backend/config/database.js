const { Sequelize } = require('sequelize');

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.warn('⚠️ WARNING: DATABASE_URL is not set. Database operations will fail until DATABASE_URL is configured.');
  console.warn('👉 Set DATABASE_URL in Render Dashboard → Environment → Add Environment Variable');
}

if (databaseUrl && (databaseUrl.includes('@host:') || databaseUrl.includes('user:password@'))) {
  console.warn('⚠️ WARNING: DATABASE_URL contains placeholder values. Replace it with your real PostgreSQL connection string.');
  console.warn('👉 Go to Render Dashboard → PostgreSQL → Info → External Database URL and copy the connection string.');
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
    connectTimeout: 60000,
    // Statement timeout prevents long-running queries from hanging on free tier
    statement_timeout: 30000,
    idle_in_transaction_session_timeout: 60000,
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
    // Render free tier PostgreSQL allows limited connections (~5-10)
    max: parseInt(process.env.DB_POOL_MAX || '5', 10),
    min: 0,
    acquire: 60000,
    idle: 10000,
    // Evict idle connections faster to stay within free tier limits
    evict: 1000,
  },
  retry: {
    max: 3,
  },
});

module.exports = sequelize;
