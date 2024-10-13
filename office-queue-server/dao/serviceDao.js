import sqlite3 from 'sqlite3';
import db from '../db.mjs';


//function to get all services
 function getAllServicesId() {
  return new Promise((resolve, reject) => {

    const query = 'SELECT id FROM service';

    db.all(query, (err, rows) => {
      if (err) {
        return reject(err);
      }
 resolve(rows);
    });
  });
}

//function to get all services
function getAllServices() {
  return new Promise((resolve, reject) => {

    const query = 'SELECT * FROM service';

    db.all(query, (err, rows) => {
      if (err) {
        return reject(err);
      }
    resolve(rows);
    });
  });
}

//function to verify the service type
 async function verifyServiceType(serviceId) {
  const services = await ServiceDao.getAllServicesId(); 
  const service = services.find(service => service.id === serviceId);

  if (!service) {
    throw new Error('Invalid service ID');
  }
  return service;
}

//function to get a service by id
 function getServiceById(serviceId) {
  return new Promise((resolve, reject) => {

    const query = 'SELECT * FROM service WHERE id = ?';
    const params = [serviceId];

    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }

      resolve(row);
    });         
  });
}

async function getTimeService(serviceId) {
  return new Promise((resolve,reject) =>{
    //per ogni counter serviceTime , lengthqueue, num servizi forniti, 1 se valido, 0 se non è valido
    const query = "SELECT averageTime FROM service WHERE id = ?" 

    db.get(query,[serviceId], (err,row)=>{
      if (err) {
        return reject(err);
      }
      resolve(row.averageTime)
    });

  });
}

// returns counterIds that can offer a serviceId
async function getCounterServices(serviceId) {
  return new Promise((resolve,reject) =>{
    //per ogni counter serviceTime , lengthqueue, num servizi forniti, 1 se valido, 0 se non è valido
    const query = "SELECT counterId FROM daily_setting WHERE serviceId = ?" 

    db.all(query,[serviceId], (err,rows)=>{
      if (err) {
        return reject(err);
      }
      console.log(rows)
      resolve(rows.map(e => e.counterId))
    });

  });
}

// returns number of services offerd by counterId 
async function getCounterServiceOffered(counterId) {
  return new Promise((resolve,reject) =>{
    //per ogni counter serviceTime , lengthqueue, num servizi forniti, 1 se valido, 0 se non è valido
    const query = "SELECT COUNT(*) AS count FROM daily_setting WHERE counterId = ?" 

    db.get(query,[counterId], (err,row)=>{
      if (err) {
        return reject(err);
      }
      resolve(row.count)
    });

  });
}

const ServiceDao = {
  getAllServicesId,
  getServiceById,
  verifyServiceType,
  getAllServices,
  getTimeService,
  getCounterServices,
  getCounterServiceOffered
};

export default ServiceDao;
