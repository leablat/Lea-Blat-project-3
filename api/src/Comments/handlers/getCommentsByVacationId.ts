import { ResultSetHeader } from "mysql2";
import { pool } from "../../database";


async function getCommentsByVacationId(vacationId: number) {
    try {
        console.log("vacationId", vacationId);

        const result = await pool.execute(
            `SELECT users.firstName AS 'userName', comments.comment, comments.commentId
            FROM comments
            join users on comments.userId = users.userId
            where comments.vacationId = ? `,
            [vacationId]
        );
        return result;
    }
    catch (error) {
        console.log(error);

    }


}

export { getCommentsByVacationId }