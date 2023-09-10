import { pool } from "../../database"


async function getSumOfFollowers(){

    const query = `SELECT count(vacationId) as cnt, vacationId from vacations.followers group by vacationId`
    const results = await pool.execute(query);
    
    return results;
}

export {getSumOfFollowers}