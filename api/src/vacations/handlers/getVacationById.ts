

import { pool } from "../../../../database"



async function getVacationById(vacationId: number) {
    try {
        if (typeof vacationId !== 'number') throw new Error("Id is not a valid Number")
        const query = `SELECT * from vacations.vacations  WHERE vacationId = ?`
        const results = await pool.execute(query, [vacationId]);
        const [data] = results;
        return data && data[0];
    }
    catch (e) {
        throw new Error(e)
    }
}

export { getVacationById }