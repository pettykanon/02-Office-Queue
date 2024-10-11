import db from "../db.mjs";


// retrieve all the services offered by a counter
export default function getServices(counterId) {
    return new Promise((resolve,Object) => {
        
        const query = "SELECT * FROM `counter` WHERE `counterId` = ?";
        db.all(query, [counterId], (error, rows) => {
            if (error) throw error;
            resolve(rows);
        })
    })
}
