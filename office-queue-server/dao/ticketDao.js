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
    const query = `INSERT INTO ticket (code, serviceId, estimatedWaitingTime, statusId) VALUES (?, ?, ?, ?)`;
    const params = [generatedTicketCode, serviceId, estimatedWaitingTime, 1]; // Assuming statusId is set to 1 by default

    db.run(query, params, function (err) {
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
    const ticketCode = `${serviceLetter}${queueLength + 1}`;
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

//function to get tickets(customers) for each service type
function getTicketsByServiceId(serviceId) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM ticket WHERE serviceId = ?`;
    const params = [serviceId];

    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });

}

//!!!Very complex function needs to be improved also checked very carefully!!!
//function to get tickets(customers) for each counter and service type according to the statusId, 
//this function can be used to get the served tickets (statusId = 2) for each counter within a given month 
//(should be improved to day,week, year etc.)

//to test this, use the following:
// 1- change import db from '../db.mjs'; to import db from '../testDb.mjs' in ticketDao.js;
// 2- go to dao-test/testTicketDao.js, uncomment testGetTicketsByServiceAndStatus();
// 3- run the test with cd dao-test and node testTicketDao.js
// 4- insert more data to have detailed check from insertMockData.js if needed

//date can be:
// 
function getServedCustomerByServiceType(start, end) {
  return new Promise((resolve, reject) => {

    const query = `SELECT s.name, COUNT(*) AS customersCount FROM history h, service s WHERE h.serviceId = s.id AND h.date >= ? AND h.date <= ? GROUP BY h.serviceId`;

    db.all(query, [start, end], (err, rows) => {
      if (err) {
        return reject(err);
      }
      console.log(rows);
      resolve(rows);
    });
  });
}

// Function to update the statusId of a ticket by incrementing it by 1, but not exceeding 4
//use this function to notify the customer that his/her ticket has been served (notify served customers story)
function getServedCustomerByCounter(start, end) {
  return new Promise((resolve, reject) => {

    const query = `SELECT h.counterId, s.name, COUNT(*) AS customersCount FROM history h, service s WHERE h.serviceId = s.id AND h.date >= ? AND h.date <= ? GROUP BY h.counterId, s.id`;

    db.all(query, [start, end], (err, rows) => {
      if (err) {
        return reject(err);
      }
      console.log(rows);
      resolve(rows);
    });
  });
}




const TicketDao = {
  createTicket,
  getQueueLength,
  getTicketByCode,
  getTicketById,
  generateTicketCode,
  getTicketsByServiceId,
  getServedCustomerByServiceType,
  getServedCustomerByCounter

};

export default TicketDao;

