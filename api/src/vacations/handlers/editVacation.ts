import { pool } from "../../database";
import { IVacation } from "./addVacation"; 


async function updateVacation(vacationId: number, updatedData: IVacation): Promise<void> {
    const { destination, description, startDate, endDate, price, imageFileName } = updatedData;

    const query = `
        UPDATE \`vacations\`
        SET
            \`destination\` = ?,
            \`description\` = ?,
            \`startDate\` = ?,
            \`endDate\` = ?,
            \`price\` = ?,
            \`imageFileName\` = ?
        WHERE
            \`vacationId\` = ?;
    `;

    const parameters = [destination, description, startDate, endDate, price, imageFileName, vacationId];

    await pool.execute(query, parameters);
}

export { updateVacation };
