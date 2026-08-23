const bcrypt = require('bcryptjs');
const { User } = require('../models');

const SEED_USERS = [
  {
    name: 'Dr. Sharma',
    email: 'admin@college.com',
    password: 'admin123',
    role: 'admin',
  },
  {
    name: 'Prof. Gupta',
    email: 'teacher@college.com',
    password: 'teacher123',
    role: 'teacher',
  },
  {
    name: 'Rahul Kumar',
    email: 'student@college.com',
    password: 'student123',
    role: 'student',
  },
];

async function ensureSeedUsers() {
  for (const u of SEED_USERS) {
    const existing = await User.findOne({ where: { email: u.email } });
    if (existing) continue;
    const hashed = await bcrypt.hash(u.password, 12);
    await User.create({ ...u, password: hashed });
    console.log(`Seeded ${u.role} account: ${u.email}`);
  }
}

module.exports = { ensureSeedUsers, SEED_USERS };
