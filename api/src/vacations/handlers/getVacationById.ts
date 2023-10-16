

import { pool } from "../../../../database"



async function getVacationById(vacationId:number){
   
    if (typeof vacationId !== 'number') throw new Error("Id is not a valid Number")
    const query = `SELECT * from vacations.vacations  WHERE vacationId = ?`
    const results = await pool.execute(query, [vacationId]);
  
    const [data]= results;
    return data[0];
}

export { getVacationById }