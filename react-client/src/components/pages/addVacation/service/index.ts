import axios from "axios";
import axiosConfig from "../../helper/httpConfig";





async function addNewVacationService(vacation: any) {
  try {
    const { destination, description, startDate, endDate, price, imageFileName } = vacation;
    if (!destination || !description || !startDate || !endDate
      || !price || !imageFileName
    ) {
      alert("All fields are mandatory!");
      throw new Error("Missing required fields");
    }
    console.log(vacation);

    const { data } = await axios.post(`${axiosConfig.baseUrl}/vacations/new`,vacation, axiosConfig.options)
    return data;
  }
  catch (e) {
    throw new Error;
  }
}
export { addNewVacationService }

