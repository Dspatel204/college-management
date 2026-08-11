const express = require('express');
const cors = require('cors');
require('dotenv').config();
const mongoose = require('mongoose');
const { setMongoConnected } = require('./state');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Backend is running successfully!' });
});

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/college_db';

mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log('MongoDB connected');
    setMongoConnected(true);
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    console.log('Running without MongoDB persistence');
  });

app.use('/api', require('./routes/exampleRoutes'));
app.use('/api', require('./routes/collegeRoutes'));

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message || 'Something went wrong' });
});

const PORT = process.env.PORT || 5000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = { app };
