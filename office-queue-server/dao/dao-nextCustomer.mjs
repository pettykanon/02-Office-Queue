import db from "../db.mjs";

export async function insertHistory(history) {
    return new Promise( (resolve, reject) => {
        const query = `INSERT INTO History (counterId, serviceId, date) VALUES (?,?,?)`;
        const params = [history.counterId, history.serviceType, history.date, history.spentTime]

        db.run(query, params, function (err) {
            if (err) {
                reject(err);
            } else {
                resolve(this.lastID);
            }
        });
    })
}

const NextCustomerDAO = {
    insertHistory
  };

  export default NextCustomerDAO;