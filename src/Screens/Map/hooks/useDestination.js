import axios from "axios"
import { useReservation } from "../../../Context/reservaContext"
import { useUser } from "../../../Context/dataUserContext"
import { latitudeDelta, longitudeDelta } from "../../../Mocks/location"
import { Alert } from "react-native"
import { DISTANCE_MATRIX_API_KEY } from "@env"
import ReadApi from "../../../Services/readData"
import useParkings from "../../../Hooks/useParkings"
import { useEffect } from "react"

const useDistance = () => {

    const { destination, setDestination, setDistanceMatrix } = useReservation()
    const { location } = useUser()

    const { loadParkings } = useParkings()

    async function getDistanceMatrix() {

        if (!destination || !location) return

        axios.get(`
            https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination?.latitude},%20${destination?.longitude}&origins=${location?.latitude},%20${location?.longitude}&key=${DISTANCE_MATRIX_API_KEY}&mode=driving
        `)
            .then(res => {
                setDistanceMatrix(res.data.rows[0].elements[0].duration.value)
            })
            .catch(e => {
                setDistanceMatrix(`Error`)
            })
    }
    
    const retornarCoordenadas = async ({ item }, setLoading) => {
        try {
            setLoading(true)

            await loadParkings(
                {
                    latitude: item.latitude,
                    longitude: item.longitude
                },
                0.1
            )

            setDestination({
                ...item,
                latitudeDelta: latitudeDelta,
                longitudeDelta: longitudeDelta
            })
        } catch (error) {
            Alert.alert("Erro ao retornar coordenadas:", JSON.stringify(error))
        } finally {
            setLoading(false)
        }
    }

    return { getDistanceMatrix, retornarCoordenadas }
}

export default useDistance