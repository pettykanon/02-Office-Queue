
//this is the test file for creating mock data to test the CounterDao.mjs file
import Counterdao from './CounterDao.mjs';
import TicketDao from './ticketDao.js';

const CounterDao = new Counterdao();


async function getServices() {
  try {
    const counterId = 1;
    const services = await CounterDao.getCounterServices(counterId);
    console.log('Services:', services);
  }
  catch (error) {
    console.error('Error getting services:', error);
  }
}
getServices();

async function setAsDone() {
  const ticketCode = 'E2';
  let ticket = await TicketDao.getTicketByCode(ticketCode);
  console.log('Ticket:', ticket);

  try {
    const result = await CounterDao.setTicketDone(ticketCode);
  }
  catch (error) {
    console.error('Error setting as done:', error);
  }

  ticket = await TicketDao.getTicketByCode(ticketCode);
  console.log('Ticket:', ticket);
}

setAsDone();
