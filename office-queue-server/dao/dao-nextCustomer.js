import db from "../db.mjs";
import Ticket from "../models/Ticket.mjs";

export default function NextCustomerDao() {

    // POST HISTORY 
    this.insertHistory = async function(history) {
        try {
            const result = await db.query(
                `INSERT INTO History (counterId, serviceType, date, SpentTime)
                 VALUES (?, ?, ?, ?)`, [history.counterId, history.serviceType, history.date, history.SpentTime]
            );
            
            return result.insertId;
        } catch (error) {
            console.error("Error inserting history: ", error);
            throw error;
        }
    };
}