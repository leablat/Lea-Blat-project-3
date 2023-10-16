import axios from "axios";
import axiosConfig from "../../helper/httpConfig";

export async function loginByTokenService(token: string) {
    const res = await axios.post(`${axiosConfig.baseUrl}/loginByToken`, { token: token })
    return res.data;
}