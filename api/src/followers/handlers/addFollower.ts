import { pool } from "../../database";


export interface IFollowers {
    userId: number;
    vacationId: number;
}


async function addFollower(vacationId, userId): Promise<Number> {
    try {
console.log("yhilik");

        const query =
            "INSERT INTO `vacations`.`followers` (`userId`, `vacationId`) VALUES (?,?);";


        const results = await pool.execute(query, [
           userId,
           vacationId
        ]);

        const [data] = results;
        return (data as any).insertId;
    } catch (error) {
        console.error("Error executing MySQL query:", error);
        throw new Error("Failed to add vacation");
    }
}

export { addFollower }