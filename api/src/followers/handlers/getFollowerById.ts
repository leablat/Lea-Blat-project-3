import { ResultSetHeader } from "mysql2";
import { pool } from "../../../../database"

async function getFollowerById(vacationId: number, userId: number) {
    try {
        const result = await pool.execute(
            'SELECT * FROM followers WHERE vacationId =? and userId=?',
            [vacationId, userId]
        );
        return result;
    }
    catch (error) {
        throw new Error(error)
    }
}

export { getFollowerById }