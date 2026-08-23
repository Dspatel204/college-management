/**
 * Seed script — creates default admin, teacher, and student accounts.
 * Run once after deploying: node seed.js
 */
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const { syncDatabase } = require('./models');
const { ensureSeedUsers, SEED_USERS } = require('./lib/ensureSeedUsers');

async function seed() {
  try {
    await syncDatabase();
    console.log('Database synced. Seeding users...');
    await ensureSeedUsers();

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
