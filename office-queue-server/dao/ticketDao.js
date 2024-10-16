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
async function createTicket(serviceId, estimatedWaitingTime) {
  return new Promise(async (resolve, reject) => {
    const generatedTicketCode = await generateTicketCode(serviceId);
    const query = `INSERT INTO ticket (code, serviceId, estimatedWaitingTime, statusId, counterId) VALUES (?, ?, ?, ?, ?)`;
    const params = [generatedTicketCode, serviceId, estimatedWaitingTime, 1, null]; // Assuming statusId is set to 1 by default

    db.run(query, params, function(err) {
      if (err) {
        return reject(err);
      }
      resolve({
        id: this.lastID, // The ID of the newly inserted ticket
        code: generatedTicketCode,
        serviceId,
        estimatedWaitingTime,
        statusId: 1 // Default statusId to show ticket is in queue
      });
    });
  });
}

//function to generate a ticket code based on the serviceId
// the logic is as follows:
// assume the counters are as follows:
// service A: A1, A2, A3, A4, A5
// service B: B1, B2, B3
// service C: C1, C2, C3, C4, C5, C6
// service D: D1, D2
// service E: E1
// the function will return the next ticket code based on the serviceId and the current queue length of that service
async function generateTicketCode(serviceId) {
  try {
      // Fetch the current queue length for the service
      const queueLength = await getQueueLength(serviceId);
      // Map serviceId to corresponding letter
      const serviceLetterMap = {
        1: 'A',
        2: 'B',
        3: 'C',
        4: 'D',
        5: 'E'
      };

      const serviceLetter = serviceLetterMap[serviceId] || ''; 
      const ticketCode = `${serviceLetter}${queueLength +1}`;
      return ticketCode;
  } catch (error) {
    console.error('Error generating ticket code:', error);
    throw error;
  }
}

//function to calculate queue lenght for each service type. 
//assume that there are 5 people in the queue for service A, if parameter serviceId is 1, then the function will return 5
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

function setCounterTicket(code, counterId) {
  return new Promise((resolve, reject) => {
//statusId = 1 means that the ticket's status is "waiting" and should be added to the queue lenght
    const query = `UPDATE ticket SET counterId = ? WHERE code = ?`;
    const params = [counterId, code];

    db.run(query, params, function(err) {
      if (err) {
        return reject(err);
      }
      resolve(this.changes)
    });
})
}

const TicketDao = {
  createTicket,
  getQueueLength,
  getTicketByCode,
  getTicketById,
  generateTicketCode,
  setCounterTicket

};

export default TicketDao;

