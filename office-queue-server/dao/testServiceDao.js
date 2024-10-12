import { getAllServicesId } from './serviceDao.js';

async function testServiceDao(){
  const services = await getAllServicesId();
  console.log(services);
}

testServiceDao();