import axios from "axios"
import { LOCAL_API } from "@env"

const api = axios.create({
    baseURL: "https://parko-server-production.up.railway.app/api/"
})

export default api