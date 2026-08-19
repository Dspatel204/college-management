/**
 * Seed script — creates default admin, teacher, and student accounts.
 * Run once after deploying: node seed.js
 */
require('dotenv').config();
const bcrypt = require('bcryptjs');
const { syncDatabase, User } = require('./models');

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

async function seed() {
  try {
    await syncDatabase();
    console.log('Database synced. Seeding users...');

    for (const u of SEED_USERS) {
      const existing = await User.findOne({ where: { email: u.email } });
      if (existing) {
        console.log(`  ⚠  ${u.email} already exists — skipping`);
        continue;
      }
      const hashed = await bcrypt.hash(u.password, 12);
      await User.create({ ...u, password: hashed });
      console.log(`  ✓  Created ${u.role}: ${u.email}`);
    }

    console.log('\nSeed complete!');
    console.log('Demo credentials:');
    SEED_USERS.forEach((u) => console.log(`  ${u.role}: ${u.email} / ${u.password}`));
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
