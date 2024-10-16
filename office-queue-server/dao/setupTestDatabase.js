import testDb from '../testDb.mjs';

function setupDatabase() {
  return new Promise((resolve, reject) => {
    const queries = [
      // Create counters table
      `CREATE TABLE IF NOT EXISTS counters (
        id INTEGER PRIMARY KEY
      );`,

      // Create tickets table
      `CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY,
        code TEXT,
        serviceId INTEGER,
        estimatedWaitingTime INTEGER,
        statusId INTEGER
      );`,

      // Create history table
      `CREATE TABLE IF NOT EXISTS history (
        Id INTEGER PRIMARY KEY,
        counterId INTEGER,
        serviceId INTEGER,
        date TEXT,
        timeSpent INTEGER
      );`
    ];

    testDb.serialize(() => {
      queries.forEach((query) => {
        testDb.run(query, (err) => {
          if (err) {
            return reject(err);
          }
        });
      });
      resolve();
    });
  });
}

setupDatabase()
  .then(() => {
    console.log('Test database setup complete.');
    testDb.close();
  })
  .catch((error) => {
    console.error('Error setting up test database:', error);
    testDb.close();
  });