import axios from "axios";
import { axiosConfig } from "../../../helper/httpConfig";

async function deleteVacationService(vacationId: Number) {
  try {
    await axios.delete(`${axiosConfig().baseUrl}/vacations/${vacationId}`, axiosConfig().options)
    return `Vacation with ID ${vacationId} has been deleted.`;
  }
  catch (error: any) {
    if (error.response.status == 401) {
      throw Error("401");
    }
    throw Error("error");
  }
}

export { deleteVacationService };
