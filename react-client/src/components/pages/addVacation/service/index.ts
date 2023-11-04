import axios from "axios";
import { axiosConfig } from "../../helper/httpConfig";

async function addNewVacationService(vacation: any) {
  try {
    await axios.post(`${axiosConfig().baseUrl}/vacations/new`, vacation, axiosConfig().options)
  }
  catch (error: any) {
    if (error.response.status == 401) {
      throw Error("401");
    }
    throw Error("error");
  }
}
export { addNewVacationService }

