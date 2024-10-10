
//this is the test file for creating mock data for testing the ticketDao.js file
import { createTicket } from './ticketDao.js';

import { getQueueLength } from './ticketDao.js';

async function createNewTicket() {
  try {
    const ticketCode = `T${Date.now()}`; // Example ticket code
    const serviceType = 1; // Example service type ID
    const estimatedWaitingTime = 15; // Example estimated waiting time

    const newTicket = await createTicket(ticketCode, serviceType, estimatedWaitingTime);
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
