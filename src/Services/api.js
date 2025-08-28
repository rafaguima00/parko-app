import axios from "axios"
import { URL_API, STATUS_APP } from "@env"

const api = axios.create({
    baseURL: STATUS_APP === "test" ? "http://192.168.15.3:3300/api" : URL_API
})

export default api