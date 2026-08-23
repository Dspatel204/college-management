const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { syncDatabase } = require('./models');
const { ensureSeedUsers } = require('./lib/ensureSeedUsers');

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'http://localhost:8080',
  'https://college-management-n6be.onrender.com',
  process.env.FRONTEND_URL,
].filter(Boolean);

const isAllowedOrigin = (origin) => {
  if (!origin) return true;
  if (allowedOrigins.includes(origin)) return true;
  if (/^https:\/\/[\w.-]+\.vercel\.app$/.test(origin)) return true;
  if (/^https:\/\/[\w.-]+\.onrender\.com$/.test(origin)) return true;
  if (/^https:\/\/[\w.-]+\.lovable\.app$/.test(origin)) return true;
  return false;
};

app.use(cors({
  origin: (origin, callback) => {
    if (isAllowedOrigin(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

app.get('/', (req, res) => {
  res.json({
    message: 'College Management API is running',
    version: '2.0.0',
    database: 'PostgreSQL',
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

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'API is healthy' });
});

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
  console.error(err.stack);
  res.status(err.status || 500).json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  if (!process.env.JWT_SECRET) {
    console.warn('JWT_SECRET is not set. Login tokens will fail until it is configured.');
  }

  syncDatabase()
    .then(() => ensureSeedUsers())
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Failed to start server:', err.message);
      process.exit(1);
    });
}

module.exports = { app };
