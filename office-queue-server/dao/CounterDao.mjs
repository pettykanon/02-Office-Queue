import db from "../db.mjs";


export default function Counterdao() {


    /* retrieve all the services offered by a counter*/
    this.getCounterServices = (counterId) => {
        
        return new Promise((resolve,Object) => {
            
            const query = 'SELECT serviceid FROM daily_setting WHERE counterId = ?';
            db.all(query, [counterId], (error, rows) => {
                if (error) throw error;
                resolve(rows);
            })
        })
    }

    /* sets the status of the previous custoemr's ticket to done*/
    this.setTicketDone = (ticketId) => {
        return new Promise((resolve,Object) => {
            const query = 'UPDATE ticket SET statusId = 3 WHERE id = ?';
            db.run(query, [ticketId], (error, rows) => {
                if (error) throw error;
                resolve(rows);
            })
        })
    }
}
