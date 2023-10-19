import axios from "axios";
import {axiosConfig} from "../../helper/httpConfig";


export async function getReportDataService(){
    const res = await axios.get(`${axiosConfig().baseUrl}/reports`, axiosConfig().options)
    return res.data;
}