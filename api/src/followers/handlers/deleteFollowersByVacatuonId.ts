import { ResultSetHeader } from "mysql2";
import { pool } from "../../../../database"


async function deleteFollowersByVacationId(vacationId: number) {
    try {
        const [deleteFollowers] = await pool.execute(
            'DELETE FROM followers WHERE vacationId =? ',
            [vacationId]
        );
        if ((deleteFollowers as ResultSetHeader).affectedRows === 0) {
            throw new Error(`Vacation with ID ${vacationId} not found.`);
        }
    }
    catch (error) {
        throw Error(`Vacation with ID ${vacationId} not found.`);
    }
}

export { deleteFollowersByVacationId as deleteFollowersByVacatuonId }