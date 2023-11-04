import axios from "axios";
import { axiosConfig } from "../../helper/httpConfig";

export async function getReportDataService() {
    try {
        const { data } = await axios.get(`${axiosConfig().baseUrl}/reports`, axiosConfig().options)
        return data;
    } catch (error: any) {
        if (error.response.status == 401) {
            throw Error("401");
        }
        throw Error("error");
    }
}
    
