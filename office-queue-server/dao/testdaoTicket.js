
//this is the test file for creating mock data to test the ticketDao.js file
import TicketDao from './ticketDao.js';

async function createNewTicket() {
  try {
    const ticketCode = `T${Date.now()}`; // Example ticket code
    const serviceType = 6; // Example service type ID
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
    const queueLength = await getQueueLength(serviceType);
    console.log('Queue length:', queueLength);
  
  } catch (error) {
    console.error('Error getting queue length:', error);
  }
}

//getQueueLengthForServiceType(1);
