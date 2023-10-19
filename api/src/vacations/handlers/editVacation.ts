import { pool } from "../../../../database"
import { ResultSetHeader } from "mysql2"
import { IVacation } from "./addVacation";


async function updateVacation(vacationId: number, updatedData: IVacation): Promise<number> {
    const { destination, description, startDate, endDate, price, imageFileName } = updatedData;
    try {
        const query = `
                UPDATE vacations SET destination = ?, description = ?, startDate = ?, endDate = ?, price = ?, imageFileName = ?
                WHERE vacationId = ?`;
        const parameters = [destination, description, startDate, endDate, price, imageFileName, vacationId];
        const results =  await pool.execute(query, parameters);
        const [data] = results;
        return (data as ResultSetHeader).affectedRows        
    }
    catch (e) { 
        throw new Error("Failed to edit vacation");

    }
}

export { updateVacation };
