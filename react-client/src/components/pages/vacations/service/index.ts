import axios from "axios";
import axiosConfig from "../../helper/httpConfig"

export interface IVacation {
  vacationId: number,
  destination: string,
  description: string,
  startDate: string,
  endDate: string,
  price: string,
  imageFileName: string
}

async function getAllVacationsService(): Promise<Array<IVacation>> {
console.log(axiosConfig.options);

  const { data, headers } = await axios.get(`${axiosConfig.baseUrl}/vacations`, axiosConfig.options).catch((error) => {
      if (error.response.status == 401) {
        throw Error("401");
      }
      throw Error("error");
    })

  if (!Array.isArray(data)) throw new Error(`Error Please contact support ${headers["x-request-id"]}`)

  const vacations: Array<IVacation> = data.map((v) => {
    return {
      vacationId: v.vacationId,
      destination: v.destination,
      description: v.description,
      startDate: v.startDate,
      endDate: v.endDate,
      price: v.price,
      imageFileName: v.imageFileName

    }
  })
  return vacations;
}

export { getAllVacationsService }

