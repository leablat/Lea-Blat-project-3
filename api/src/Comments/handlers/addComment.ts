import { pool } from "../../../../database"

async function addComment(vacationId: number, comment: string, userId: number): Promise<number> {
    console.log(typeof comment);
    
    if (typeof comment != 'string') throw new Error("not valid type")
    try {
        if (comment === undefined || vacationId === undefined || userId === undefined) {
            throw new Error("One or more input values are undefined.");
        }
        const query = "INSERT INTO `vacations`.`comments` (`comment`, `vacationId`,`userId`) VALUES (?,?,?);";
        const results = await pool.execute(query, [comment, vacationId, userId]);
        const data = results;
        return (data as any).insertId;
    } catch (error) {
        throw new Error("Failed to add comment");
    }
}

export { addComment }
