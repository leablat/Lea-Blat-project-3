import axios from "axios";

async function deleteVacationService(vacationId:Number) {
  try {
    
    const response = await axios.delete(`http://localhost:4002/vacations/${vacationId}`);

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
