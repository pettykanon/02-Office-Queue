import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('..', 'database.db');

// Function to insert a new ticket
export function createTicket(ticketCode, serviceType, estimatedWaitingTime) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `INSERT INTO ticket (code, serviceId, estimatedWaitingTime, statusId) VALUES (?, ?, ?, ?)`;
    const params = [ticketCode, serviceType, estimatedWaitingTime, 1]; // Assuming statusId is set to 1 by default

    db.run(query, params, function(err) {
      db.close(); 
      if (err) {
        return reject(err);
      }
      
      resolve({
        id: this.lastID, // The ID of the newly inserted ticket
        code: ticketCode,
        serviceId: serviceType,
        estimatedWaitingTime,
        statusId: 1 // Reflect the default statusId
      });
    });
  });
}