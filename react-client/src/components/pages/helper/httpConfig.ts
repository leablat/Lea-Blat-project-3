const axiosConfig = {
    baseUrl: "http://localhost:4002",
    options: {
        headers: {
            authorization: localStorage.getItem("token")
        }
    }
}

export default axiosConfig