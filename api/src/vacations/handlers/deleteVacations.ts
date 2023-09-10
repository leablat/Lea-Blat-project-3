import { pool } from "../../database";
import { ResultSetHeader } from "mysql2";
import { IVacation } from "./addVacation";

async function deletionVacation(vacationId: number) {
  try {
    const [deletedVacation] = await pool.execute(
      'DELETE FROM vacations WHERE vacationId =? ',
      [vacationId]
    );

    if ((deletedVacation as ResultSetHeader).affectedRows === 0) {
      throw new Error(`Vacation with ID ${vacationId} not found.`);
    }

    return `Vacation with ID ${vacationId} has been deleted.`;
  } catch (error) {
    console.error(`Error deleting vacation: ${error.message}`);
    throw error;
  }
}

export { deletionVacation };
