import axios from "axios";
import axiosConfig from "../../helper/httpConfig";


export async function getReportFollowersDataService(){
    const res = await axios.get(`${axiosConfig.baseUrl}/followers/report`, axiosConfig.options)
    return res.data;
}