export function axiosConfig() {
    return {
        baseUrl: "http://localhost:4002",
        options: {
            headers: {
                authorization: localStorage.getItem("token")
            }
        }
    }
}

