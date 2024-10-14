import db from "../db.mjs";


export default class Counterdao {
    constructor() {


        /* retrieve all the services offered by a counter*/
        this.getCounterServices = (counterId) => {

            return new Promise((resolve, Object) => {

                const query = 'SELECT serviceid FROM daily_setting WHERE counterId = ?';
                db.all(query, [counterId], (error, rows) => {
                    if (error) throw error;
                    resolve(rows);
                });
            });
        };

        /* sets the status of the previous custoemr's ticket to done*/
        this.setTicketDone = (ticketCode) => {
            return new Promise((resolve, Object) => {
                const query = 'UPDATE ticket SET statusId = 3 WHERE code = ?';
                db.run(query, [ticketCode], (error, rows) => {
                    if (error) throw error;
                    resolve(rows);
                });
            });
        };

        this.setTicketServing = (ticketCode) => {
            return new Promise((resolve, Object) => {
                const query = 'UPDATE ticket SET statusId = 2 WHERE code = ?';
                db.run(query, [ticketCode], (error, rows) => {
                    if (error) throw error;
                    resolve(rows);
                });
            });
        };

        //gets the next ticket in a queue of a service
        this.getServiceWaitingTicket = (serviceID) => {
            return new Promise((resolve, Object) => {

                const query = 'SELECT code FROM ticket WHERE serviceId = ? AND statusId = 1';
                db.get(query, [serviceID], (error, rows) => {
                    if (error) throw error;
                    resolve(rows);
                });
            });
        };

        this.getAllCounters = () =>{
            return new Promise((resolve, Object) => {

                const query = 'SELECT * FROM counter';
                db.all(query, (error, rows) => {
                    if (error) throw error;
                    resolve(rows.map(e=>e.id));
                });
            });
        }
    }
}
