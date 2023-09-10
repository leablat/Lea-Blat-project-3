import axios from "axios";
import axiosConfig from "../../helper/httpConfig";

async function getVacationService(vacationId:any) {
  try {
    console.log(axiosConfig);
    
    // const url = `${axiosConfig.baseUrl}/vacations/${vacationId}`;
    const { data } = await axios.get(`${axiosConfig.baseUrl}/vacations/${vacationId}`, axiosConfig.options);

    if (!data) {
      throw new Error(`Vacation with ID ${vacationId} not found`);
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




async function editVacationService(vacationId:any, updatedVacation:any) {
  try {
    const { destination, description, startDate, endDate, price, imageFileName } = updatedVacation;
    if (!destination || !description || !startDate || !endDate ||!price || !imageFileName) {
      alert("All fields are mandatory!");
      throw new Error("Missing required fields");
    }

    const url = `${axiosConfig.baseUrl}/vacations/${vacationId}`;
    const { data } = await axios.put(url, updatedVacation, axiosConfig.options);
    
    return data;
  } catch (e) {
    throw e; // Re-throw the caught error
  }
}

export { editVacationService,getVacationService };
