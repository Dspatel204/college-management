const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { syncDatabase } = require('./models');
const { ensureSeedUsers } = require('./lib/ensureSeedUsers');

const app = express();

const customOrigins = (process.env.FRONTEND_URL || '')
  .split(',')
  .map((s) => s.trim().replace(/\/+$/, ''))
  .filter(Boolean);

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://college-management-n6be.onrender.com',
  ...customOrigins,
];

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  const cleanOrigin = origin.replace(/\/+$/, '');
  if (allowedOrigins.includes(cleanOrigin)) return true;
  if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(cleanOrigin)) return true;
  if (/^https:\/\/[\w.-]+\.onrender\.com$/.test(cleanOrigin)) return true;
  if (/^https:\/\/[\w.-]+\.lovable\.app$/.test(cleanOrigin)) return true;
  if (/^https:\/\/[\w.-]+\.netlify\.app$/.test(cleanOrigin)) return true;
  if (/^http:\/\/localhost(:\d+)?$/.test(cleanOrigin)) return true;
  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'College Management API is running',
    version: '2.0.0',
    status: 'online',
    database: 'PostgreSQL',
    nodeVersion: process.version,
    login: 'POST /api/auth/login',
  });
});

app.get('/api', (req, res) => {
  res.json({
    message: 'College Management API',
    endpoints: {
      health: 'GET /api/health',
      login: 'POST /api/auth/login',
      register: 'POST /api/auth/register',
      me: 'GET /api/auth/me',
    },
  });
});

const healthHandler = (req, res) => {
  res.json({
    status: 'ok',
    message: 'API is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    node: process.version,
  });
};

app.get('/health', healthHandler);
app.get('/api/health', healthHandler);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/upload', require('./routes/uploadRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api', require('./routes/collegeRoutes'));

app.use((req, res) => {
  res.status(404).json({
    message: `Route ${req.method} ${req.originalUrl} not found`,
    hint: req.originalUrl.includes('/auth/login')
      ? 'Login is POST /api/auth/login with JSON { email, password }'
      : undefined,
  });
});

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON body' });
  }
  console.error('Server error:', err.stack || err.message);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
});

const PORT = parseInt(process.env.PORT, 10) || 5000;

if (require.main === module) {
  console.log(`📌 Starting College Management API [Node: ${process.version}, ENV: ${process.env.NODE_ENV || 'development'}]`);
  if (!process.env.JWT_SECRET) {
    console.warn('⚠️ JWT_SECRET is not set. Login tokens will fail until it is configured.');
  }

  syncDatabase()
    .then(() => ensureSeedUsers())
    .then(() => {
      app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT} (0.0.0.0:${PORT})`);
      });
    })
    .catch((err) => {
      console.error('❌ Failed to start server:', err.message);
      console.error('👉 Tip: Check your DATABASE_URL environment variable and PostgreSQL connection.');
      process.exit(1);
    });
}


module.exports = { app };
