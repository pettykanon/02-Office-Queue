
//this is the test file for creating mock data to test the ticketDao.js file
import TicketDao from './ticketDao.js';

async function createNewTicket() {
  try {
    const serviceType = 3; // Example service type ID
    const ticketCode = await TicketDao.generateTicketCode(serviceType); // calculate ticket code
    const estimatedWaitingTime = 1; // Example estimated waiting time

    const newTicket = await TicketDao.createTicket(ticketCode, serviceType, estimatedWaitingTime);
    console.log('New ticket created:', newTicket);
  } catch (error) {
    console.error('Error creating ticket:', error);
  }
}

//createNewTicket();

async function getQueueLengthForServiceType(serviceType) {
  
  try {
    const queueLength = await TicketDao.getQueueLength(serviceType);
    console.log('Queue length:', queueLength);
  
  } catch (error) {
    console.error('Error getting queue length:', error);
  }
}

//getQueueLengthForServiceType(3);

async function generateTicketCodeForService(serviceId) {
  const ticketCode = await TicketDao.generateTicketCode(serviceId);
  console.log('Generated ticket code:', ticketCode);
}

//generateTicketCodeForService(3);

async function getTicketById(id) {
  const ticket = await TicketDao.getTicketById(id);
  console.log('Ticket:', ticket);
}

//getTicketById(17);

