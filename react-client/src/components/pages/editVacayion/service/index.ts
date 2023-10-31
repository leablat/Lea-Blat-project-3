import axios from "axios";
import { axiosConfig } from "../../helper/httpConfig";

async function getVacationService(vacationId: any) {
  try {
    const { data } = await axios.get(`${axiosConfig().baseUrl}/vacations/${vacationId}`, axiosConfig().options);
    if (!data) {
      throw Error(`Vacation with ID ${vacationId} not found`);
    }
    const vacation = {
      vacationId: data.vacationId,
      destination: data.destination,
      description: data.description,
      startDate: data.startDate,
      endDate: data.endDate,
      price: data.price,
      imageFileName: data.imageFileName,
    };
    return vacation;
  } catch (error) {
    throw error;
  }
}

async function editVacationService(vacationId: any, updatedVacation: any) {
  try {
    const url = `${axiosConfig().baseUrl}/vacations/${vacationId}`;
    await axios.put(url, updatedVacation, axiosConfig().options);
  } catch (e) {
    throw e;
  }
}

export { editVacationService, getVacationService };
