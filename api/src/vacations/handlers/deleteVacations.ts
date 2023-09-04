import { pool } from "../../database";
import { ResultSetHeader } from "mysql2";
import { IVacation } from "./addVacation";

async function deletionVacation( vacationId: number) {
  try {
    // Execute a SQL DELETE statement to delete the vacation by ID
    const [deletedVacation] = await pool.execute(
      'DELETE FROM vacations WHERE vacationId =? ',
      [vacationId]
    );

    if ((deletedVacation as ResultSetHeader).affectedRows === 0) {
      // If no vacation was deleted (vacationId not found), handle the error
      throw new Error(`Vacation with ID ${vacationId} not found.`);
    }

    // Vacation deleted successfully
    return `Vacation with ID ${vacationId} has been deleted.`;
  } catch (error) {
    // Handle any errors that occur during the deletion process
    console.error(`Error deleting vacation: ${error.message}`);
    throw error; // You can choose to rethrow the error or handle it differently
  }
}

export { deletionVacation };
