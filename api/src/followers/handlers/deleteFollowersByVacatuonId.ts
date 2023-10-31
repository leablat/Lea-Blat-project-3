import { ResultSetHeader } from "mysql2";
import { pool } from "../../../../database"


async function deleteFollowersByVacationId(vacationId: number) {
    try {
        const [deleteFollowers] = await pool.execute(
            'DELETE FROM followers WHERE vacationId =? ',
            [vacationId]
        );
    }
    catch (error) {
        throw Error(`Vacation with ID ${vacationId} not found.`);
    }
}

export { deleteFollowersByVacationId as deleteFollowersByVacatuonId }