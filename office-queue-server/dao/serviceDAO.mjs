import db from "../db.mjs";
import Service from "../models/Service.mjs";

//function to get all services
export function getAllServicesId() {
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

//function to get a service by id
export function getServiceById(serviceId) {
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

export function getServiceByName(serviceName) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT * FROM service WHERE name = ?';
      const params = [serviceName];
  
      db.get(query, params, (err, row) => {
        if (err) {
          return reject(err);
        }
        console.log(row);

        if (!row) {
          return reject(new Error(`Service with name ${serviceName} not found`));
        }

        const service = new Service(row.id, row.name, row.averageTime);
  
        resolve(service);
      });         
    });
  }

export async function verifyServiceType(serviceId) {
    const services = await ServiceDao.getAllServicesId(); 
    const service = services.find(service => service.id === serviceId);
  
    if (!service) {
      throw new Error('Invalid service name');
    }
    return service;
  }

  export function getServiceByTicketCode(ticketCode) {
    return new Promise((resolve, reject) => {
      const query = 'SELECT s.id, s.name, s.averageTime FROM service AS s, ticket AS t WHERE t.code = ? AND t.serviceId = s.id';
      const params = [ticketCode];
  
      db.get(query, params, (err, row) => {
        if (err) {
          return reject(err);
        }
        console.log(row);

        if (!row) {
          return reject(new Error(`Ticket with code ${ticketCode} not found`));
        }

        const service = new Service(row.id, row.name, row.averageTime);
  
        resolve(service);
      });         
    });
  }

const ServiceDao = {
  getAllServicesId,
  getServiceById,
  verifyServiceType,
  getServiceByName,
  getServiceByTicketCode
};

export default ServiceDao;