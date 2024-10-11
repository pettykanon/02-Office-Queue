import db from "../db.mjs";


export default function Counterdao() {


    // retrieve all the services offered by a counter
    this.getCounterServices = (counterId) => {
        
        return new Promise((resolve,Object) => {
            
            const query = "SELECT * FROM `counter` WHERE `counterId` = ?";
            db.all(query, [counterId], (error, rows) => {
                if (error) throw error;
                resolve(rows);
            })
        })
    }
}
