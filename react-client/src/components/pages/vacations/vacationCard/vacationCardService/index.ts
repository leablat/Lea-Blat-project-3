import axios from "axios";
import axiosConfig from "../../../helper/httpConfig";
// import { useNavigate } from "react-router-dom";


async function deleteVacationService(vacationId:Number) {
  try {
    // const navigate = useNavigate()

    const response = await axios.delete(`${axiosConfig.baseUrl}/vacations/${vacationId}`,axiosConfig.options).catch((error) => {
      if (error.response.status == 401) {
        // navigate("/login")

        throw Error("401");
      }
      throw Error("error");
    })


    if (response.status === 200) {
      // Vacation deleted successfully
      return `Vacation with ID ${vacationId} has been deleted.`;
    } else {
      // Handle the response in case of an error
      throw new Error(`Failed to delete vacation with ID ${vacationId}.`);
    }
  } catch (error) {
    // Handle any errors that occur during the HTTP request
    console.log(`Error deleting vacation`);
    throw error; // You can choose to rethrow the error or handle it differently
  }
}

export { deleteVacationService };
