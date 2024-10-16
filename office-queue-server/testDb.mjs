import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Construct the path to the test database file
const testDbPath = path.resolve(__dirname, 'test-database.db');

// Create and export the test database instance
const testDb = new sqlite3.Database(testDbPath, (err) => {
  if (err) {
    console.error('Error opening test database:', err.message);
  } else {
    console.log('Connected to the SQLite test database.');
  }
});

export default testDb;