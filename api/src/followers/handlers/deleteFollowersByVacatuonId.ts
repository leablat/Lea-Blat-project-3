import { ResultSetHeader } from "mysql2";
import { pool } from "../../../../database"


async function deleteFollowersByVacatuonId(vacationId: number) {
    try {
        console.log(vacationId);

        const [deleteFollowers] = await pool.execute(
            'DELETE FROM followers WHERE vacationId =? ',
            [vacationId]
        );
        if ((deleteFollowers as ResultSetHeader).affectedRows === 0) {
            throw new Error(`Vacation with ID ${vacationId} not found.`);
        }

    }
    catch (error) {
        console.log(error);
        
        throw  Error(`Vacation with ID ${vacationId} not found.`);

    }


}

export {deleteFollowersByVacatuonId }