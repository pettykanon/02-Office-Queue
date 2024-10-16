import testDb from '../testDb.mjs';

function insertMockData() {
  return new Promise((resolve, reject) => {
    const queries = [
      // Insert mock data into the counters table
      `INSERT INTO counters (id) VALUES (1), (2), (3), (4);`,

      // Insert mock data into the tickets table
      `INSERT INTO tickets (id, code, serviceId, estimatedWaitingTime, statusId) VALUES
      (1, '1A', 1, 10, 1),
      (2, '2A', 1, 15, 1),
      (3, '1B', 2, 20, 2),
      (4, '1C', 3, 25, 3);`,

      // Insert mock data into the history table
      `INSERT INTO history (Id, counterId, serviceId, date, timeSpent) VALUES
      (1, 1, 1, '2023-10-01', 30),
      (2, 2, 1, '2023-10-02', 45),
      (3, 3, 2, '2023-10-03', 20),
      (4, 4, 3, '2023-10-04', 25);`
    ];

    testDb.serialize(() => {
      testDb.run('BEGIN TRANSACTION');
      queries.forEach((query) => {
        testDb.run(query, (err) => {
          if (err) {
            return reject(err);
          }
        });
      });
      testDb.run('COMMIT', (err) => {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  });
}

insertMockData()
  .then(() => {
    console.log('Mock data inserted successfully into test database.');
    testDb.close();
  })
  .catch((error) => {
    console.error('Error inserting mock data into test database:', error);
    testDb.close();
  });