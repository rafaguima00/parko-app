import axios from "axios"
import { URL_API, STATUS_APP, HOST } from "@env"

const api = axios.create({
    baseURL: STATUS_APP === "test" ? `http://${HOST}:3300/api` : URL_API
})

export default api