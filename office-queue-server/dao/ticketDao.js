import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve('..', 'database.db');

//function to insert a new ticket
export function createTicket(ticketCode, serviceType, estimatedWaitingTime) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `INSERT INTO ticket (code, serviceId, estimatedWaitingTime, statusId) VALUES (?, ?, ?, ?)`;
    const params = [ticketCode, serviceType, estimatedWaitingTime, 1]; // assuming statusId is set to 1 by default

    db.run(query, params, function(err) {
      db.close(); 
      if (err) {
        return reject(err);
      }
      
      resolve({
        id: this.lastID, // the ID of the newly inserted ticket
        code: ticketCode,
        serviceId: serviceType,
        estimatedWaitingTime,
        statusId: 1 // default statusId to show ticket is in queue
      });
    });
  });
}

//function to calculate queue lenght for each service type. 
//select count(*) from ticket where serviceId = ? and statusId = 1
export function getQueueLength(serviceId) {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = `SELECT COUNT(*) FROM ticket WHERE serviceId = ? AND statusId = 1`;
    const params = [serviceId];

    db.get(query, params, (err, row) => {
      db.close();
      if (err) {
        return reject(err);
      }
      resolve(row['COUNT(*)']);
    });
  });
}


