import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, '../database.db');

//function to get all services
export function getAllServicesId() {
  return new Promise((resolve, reject) => {
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return reject(err);
      }
    }); 

    const query = 'SELECT id FROM service';

    db.all(query, (err, rows) => {
      db.close();
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
    const db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        return reject(err);
      }
    });

    const query = 'SELECT * FROM service WHERE id = ?';
    const params = [serviceId];

    db.get(query, params, (err, row) => {
      db.close();
      if (err) {
        return reject(err);
      }

      resolve(row);
    });         
  });
}

const ServiceDao = {
  getAllServicesId,
  getServiceById
};

export default ServiceDao;
