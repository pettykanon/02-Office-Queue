
//this is the test file for creating mock data to test the CounterDao.mjs file
import Counterdao  from './CounterDao.mjs';

const CounterDao = new Counterdao();

async function setDailySetting() {
    
    try {{
        const counterId = 1;
    }
}


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

