import { connection } from '../config/connection.js';
import { seedUsers, seedThoughts } from './data.js';

connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

connection.once('open', async () => {
  console.log('Connected to MongoDB');

  try {
    // Drop collections if they exist
    const userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
      await connection.dropCollection('users');
      console.log('Users collection dropped');
    }

    const thoughtsCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtsCheck.length) {
      await connection.dropCollection('thoughts');
      console.log('Thoughts collection dropped');
    }

    // Seed users and thoughts
    await seedUsers();
    await seedThoughts();

    console.info('Seeding complete! 🌱');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    process.exit(0);
  }
});
