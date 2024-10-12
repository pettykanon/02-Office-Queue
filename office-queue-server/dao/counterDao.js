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

export default {
    getAllCounters,
}


