import { pool } from "../../database"


async function getAllVacations(){

    const query = `SELECT * FROM vacations.vacations`
    const results = await pool.execute(query);
    
    return results[0];
}

export {getAllVacations}