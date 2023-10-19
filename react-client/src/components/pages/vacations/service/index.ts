import axios from "axios";
import { axiosConfig } from "../../helper/httpConfig";

export interface IVacation {
  vacationId: number,
  destination: string,
  description: string,
  startDate: string,
  endDate: string,
  price: string,
  imageFileName: string,
  followers: number
}

async function getAllVacationsService(isUserFollow: boolean, isNotStarted: boolean, isActive: boolean): Promise<any> {
  try {
    const query = `?isUserFollow=${isUserFollow}&isNotStarted=${isNotStarted}&isActive=${isActive}`
    return await axios.get(`${axiosConfig().baseUrl}/vacations${query}`, axiosConfig().options)
      .then((result) => {
        if (!Array.isArray(result.data)) throw new Error(`Error Please contact support ${result.headers["x-request-id"]}`)

        const vacations: Array<IVacation> = result.data.map((v) => {
          return {
            vacationId: v.vacationId,
            destination: v.destination,
            description: v.description,
            startDate: v.startDate,
            endDate: v.endDate,
            price: v.price,
            imageFileName: v.imageFileName,
            followers: v.followers ? v.followers : 0,
            IsUSerFollow: v.IsUSerFollow

          }
        })
        return vacations;
      })
      .catch((error) => {
        if (error.response.status == 401) {
          throw Error("401");
        }
        throw Error("error");
      })


  }
  catch (error: any) {
    throw new Error(error.message);
  }
}

export { getAllVacationsService }

