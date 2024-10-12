import db from '../db.mjs';

//function to get all counters
function getAllCounters() {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM counter';

        db.all(query, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

//function to get tickets (customers) for each counter according to the statusId
//statusId = 1 --> customer is waiting for the counter
//statusId = 2 --> customer is being served
//statusId = 3 --> customer has been served
//statusId = 4 --> customer's ticket is no longer available (expired)
/* cannot be tested until counter and ticket associations are completed
function getTicketsByCounterIdAndStatusId(counterId, statusId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM ticket WHERE counterId = ? AND statusId = ?`;
        const params = [counterId, statusId];

        db.all(query, params, (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}
*/


export default {
    getAllCounters,
    //getTicketsByCounterIdAndStatusId
}


