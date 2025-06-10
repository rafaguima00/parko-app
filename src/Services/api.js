import axios from "axios"
import { URL_API, STATUS_APP } from "@env"
import { Platform } from "react-native"

let baseLocal = "http://192.168.0.122:3300/api"

if (Platform.OS === "android") {
  baseLocal = "http://10.0.2.2:3300/api"
}

const api = axios.create({
  baseURL: STATUS_APP === "test" ? baseLocal : URL_API
})

export default api