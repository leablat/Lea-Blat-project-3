import axios from "axios";
import { axiosConfig } from "../../../helper/httpConfig";

async function getFollowerService(vacationId: Number) {
    try {
        // const navigate = useNavigate()

        return await axios.get(`${axiosConfig().baseUrl}/followers/${vacationId}`, axiosConfig().options)
            .then((res) => {

                return res.data
            })
            .catch((error) => {
                if (error.response.status == 401) {
                    // navigate("/login")

                    throw Error("401");
                }
                throw Error("error");
            })

    } catch (error) {

        console.log(`Error deleting vacation`);
        throw error;
    }
}


async function deleteFollowerService(vacationId: Number) {
    try {
        // const navigate = useNavigate()

        const response = await axios.delete(`${axiosConfig().baseUrl}/followers/${vacationId}`, axiosConfig().options).catch((error) => {
            if (error.response.status == 401) {
                // navigate("/login")

                throw Error("401");
            }
            throw Error("error");
        })


        if (response.status === 200) {

            return `Vacation with ID ${vacationId} has been deleted.`;
        } else {

            throw new Error(`Failed to delete vacation with ID ${vacationId}.`);
        }
    } catch (error) {

        console.log(`Error deleting vacation`);
        throw error;
    }
}

async function addFollowerService(vacationId: Number) {
    try {
        // const navigate = useNavigate()

        const response = await axios.post(`${axiosConfig().baseUrl}/followers/new`, { vacationId: vacationId }, axiosConfig().options).catch((error) => {
            if (error.response.status == 401) {
                // navigate("/login")

                throw Error("401");
            }
            throw Error("error");
        })


        if (response.status === 200) {

            return `Vacation with ID ${vacationId} has been deleted.`;
        } else {

            throw new Error(`Failed to delete vacation with ID ${vacationId}.`);
        }
    } catch (error) {

        console.log(`Error deleting vacation`);
        throw error;
    }
}

export { getFollowerService, deleteFollowerService, addFollowerService }
