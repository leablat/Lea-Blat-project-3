import { pool } from "../../../../database"
import { ResultSetHeader } from "mysql2";

async function deleteVacation(vacationId: number) {
  try {
    console.log("delete", vacationId);

    const [deletedVacation] = await pool.execute(
      'DELETE FROM vacations WHERE vacationId =? ',
      [vacationId]
    );
    if ((deletedVacation as ResultSetHeader).affectedRows === 0) {
      throw new Error(`Vacation with ID ${vacationId} not found.`);
    }
    return `Vacation with ID ${vacationId} has been deleted.`;
  } catch (error) {
    throw error;
  }
}

export { deleteVacation };
