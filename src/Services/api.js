import axios from "axios"

const api = axios.create({
    baseURL: "https://parko-server.vercel.app/api/"
})

export default api