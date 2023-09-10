import { ResultSetHeader } from "mysql2";
import { pool } from "../../database";


async function getFollowerById(vacationId: number, userId: number) {
    try {
        console.log("vacationId", userId);

        const result = await pool.execute(
            'SELECT * FROM followers WHERE vacationId =? and userId=?',
            [vacationId, userId]
        );
        return result;
    }
    catch (error) {
        console.log(error);

    }


}

export { getFollowerById }