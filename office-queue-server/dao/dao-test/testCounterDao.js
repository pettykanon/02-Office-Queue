//this is the test file for the counterDao.js file
import CounterDao from '../counterDao.js';

async function testCounterDao() {
  const counters = await CounterDao.getAllCounters();
  console.log(counters);
}

testCounterDao();