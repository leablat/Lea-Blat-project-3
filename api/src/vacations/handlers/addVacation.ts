import { pool } from "../../../../database"

import { ResultSetHeader } from "mysql2";

export interface IVacation {
    vacationId: number;
    destination: string;
    description: string;
    startDate: string;
    endDate: string;
    price: string;
    imageFileName: string;
}

async function addVacation(vacation: IVacation): Promise<number> {
    try {
        const query = "INSERT INTO `vacations`.`vacations` (`destination`, `description`, `startDate`,`endDate`, `price`,`imageFileName`) VALUES (?,?,?,?,?,?);";
        const results = await pool.execute(query, [
            vacation.destination,
            vacation.description,
            vacation.startDate,
            vacation.endDate,
            vacation.price,
            vacation.imageFileName,
        ]);
        const [data] = results;
        return (data as ResultSetHeader).insertId;
    } catch (error) {
        throw new Error("Failed to add vacation");
    }
}



export { addVacation };
