import sqlite3 from 'sqlite3';
import db from '../db.mjs';

//function to get ticket by code
 function getTicketByCode(ticketCode) {
  return new Promise((resolve, reject) => {
  
    const query = `SELECT * FROM ticket WHERE code = ?`;
    const params = [ticketCode];

    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

//function to get ticket by id
 function getTicketById(id) {
  return new Promise((resolve, reject) => {

    const query = `SELECT * FROM ticket WHERE id = ?`;
    const params = [id];

    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

//function to insert a new ticket
 function createTicket(ticketCode, serviceType, estimatedWaitingTime) {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO ticket (code, serviceId, estimatedWaitingTime, statusId) VALUES (?, ?, ?, ?)`;
    const params = [ticketCode, serviceId, estimatedWaitingTime, 1]; // Assuming statusId is set to 1 by default

    db.run(query, params, function(err) {
      if (err) {
        return reject(err);
      }
      resolve({
        id: this.lastID, // The ID of the newly inserted ticket
        code: ticketCode,
        serviceId,
        estimatedWaitingTime,
        statusId: 1 // Default statusId to show ticket is in queue
      });
    });
  });
}

//function to calculate queue lenght for each service type. 
//select count(*) from ticket where serviceId = ? and statusId = 1
 function getQueueLength(serviceId) {
  return new Promise((resolve, reject) => {
//statusId = 1 means that the ticket's status is "waiting" and should be added to the queue lenght
    const query = `SELECT COUNT(*) FROM ticket WHERE serviceId = ? AND statusId = 1`;
    const params = [serviceId];

    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row['COUNT(*)']);
    });
  });

}

const TicketDao = {
  createTicket,
  getQueueLength,
  getTicketByCode,
  getTicketById

};

export default TicketDao;

