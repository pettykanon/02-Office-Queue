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

const ServiceDao = {
  getAllServicesId,
  getServiceById,
  verifyServiceType
};

export default ServiceDao;
