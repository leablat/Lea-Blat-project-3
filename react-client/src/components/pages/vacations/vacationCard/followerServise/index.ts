import axios from "axios";
import { axiosConfig } from "../../../helper/httpConfig";

async function getFollowerService(vacationId: Number) {
    try {
        const { data } = await axios.get(`${axiosConfig().baseUrl}/followers/${vacationId}`, axiosConfig().options)
        return data
    } catch (error) {
        throw error;
    }
}


async function deleteFollowerService(vacationId: Number) {
    try {
        await axios.delete(`${axiosConfig().baseUrl}/followers/${vacationId}`, axiosConfig().options)
        return `Vacation with ID ${vacationId} has been deleted.`;
    } catch (error) {
        throw error;
    }
}

async function addFollowerService(vacationId: Number) {
    try {
        await axios.post(`${axiosConfig().baseUrl}/followers/new`, { vacationId: vacationId }, axiosConfig().options)
        return `Vacation with ID ${vacationId} has been deleted.`;
    } catch (error) {
        throw error;
    }
}

export { getFollowerService, deleteFollowerService, addFollowerService }
