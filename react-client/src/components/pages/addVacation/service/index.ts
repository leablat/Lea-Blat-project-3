import axios from "axios";
import { axiosConfig } from "../../helper/httpConfig";

async function addNewVacationService(vacation: any) {
  try {
    await axios.post(`${axiosConfig().baseUrl}/vacations/new`, vacation, axiosConfig().options)
  }
  catch (e: any) {
    throw Error(e);
  }
}
export { addNewVacationService }

