import db from "../db.mjs";

export async function getQueues() {
    return new Promise( (resolve, reject) => {
        const query = `SELECT ticket.id, ticket.code, ticket.serviceId, service.name, ticket.statusId FROM ticket INNER JOIN service ON ticket.serviceId = service.id WHERE statusId = 1 OR statusId = 2`;

        db.all(query, [], function (err, rows) {
            if (err) {
                reject(err);
            } else {
                const queues = rows.map( (e) => ({ id: e.id, code: e.code, serviceId: e.serviceId, serviceName: e.name, statusId: e.statusId  }) );
                resolve(queues);
            }
        });
    })
}

const CallCustomerDAO = {
    getQueues
};

export default CallCustomerDAO;