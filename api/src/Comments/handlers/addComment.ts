import { pool } from "../../../../database"


async function addComment(vacationId: number, comment: string, userId: number): Promise<number> {
    try {
        console.log("vacationId 2 ", vacationId);

        const query =
            "INSERT INTO `vacations`.`comments` (`comment`, `vacationId`,`userId`) VALUES (?,?,?);";

        if (comment === undefined || vacationId === undefined || userId === undefined) {
            throw new Error("One or more input values are undefined.");
        }

        const results = await pool.execute(query, [comment, vacationId, userId]);

        const data = results;
        return (data as any).insertId;
    } catch (error) {
        console.error("Error executing MySQL query:", error);
        throw new Error("Failed to add comment");
    }
}

export { addComment }
