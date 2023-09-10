import { ResultSetHeader } from "mysql2";
import { pool } from "../../database";


async function deletionFollower(vacationId: number, userId: number) {
    try {
        console.log(vacationId, userId);

        const [deletedVacation] = await pool.execute(
            'DELETE FROM followers WHERE vacationId =? and userId=?',
            [vacationId, userId]
        );
        if ((deletedVacation as ResultSetHeader).affectedRows === 0) {
            throw new Error(`Vacation with ID ${vacationId} not found.`);
        }

    }
    catch (error) {
        console.log(error);
        
        throw  Error(`Vacation with ID ${vacationId} not found.`);

    }


}

export { deletionFollower }