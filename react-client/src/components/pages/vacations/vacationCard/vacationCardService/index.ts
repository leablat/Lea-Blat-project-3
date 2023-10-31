import axios from "axios";
import { axiosConfig } from "../../../helper/httpConfig";

async function deleteVacationService(vacationId: Number) {
  try {
    await axios.delete(`${axiosConfig().baseUrl}/vacations/${vacationId}`, axiosConfig().options)
    return `Vacation with ID ${vacationId} has been deleted.`;
  }
  catch (error) {
    throw error;
  }
}

export { deleteVacationService };
