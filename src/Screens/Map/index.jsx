import { useState, useEffect } from "react"
import { Modal, View } from "react-native"
import * as Location from "expo-location"
import { styles } from "./styles"
import { useReservation } from "../../Context/reservaContext"
import Searching from "./components/searching"
import { useUser } from "../../Context/dataUserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../Services/readData"
import LoadingModal from "../../Components/Loading"
import { latitudeDelta, longitudeDelta } from "../../Mocks/location"
import BotoesSuperiores from "./components/botoesSuperiores"
import EstouIndoPara from "./components/estouIndoPara"
import InfoEstacionamento from "./components/infoEstacionamento"
import AcompanharReserva from "./components/acompanharReserva"
import MainMap from "./components/mainMap"
import useDistance from "./hooks/useDestination"
import useFavorites from "../../Hooks/useFavorites"

export default function MapaPrincipal({ navigation }) {

    const [errorMsg, setErrorMsg] = useState(null)
    const [loading, setLoading] = useState(true)

    const { 
        destination,
        reservaFeita,
        reservations,
        setReservaFeita,
        setDestination
    } = useReservation()

    const { 
        dataUser, setDataUser,
        location, setLocation,
        setUserLocation,
        modalPesquisar, setModalPesquisar,
        setEstacionamentos
    } = useUser()
    
    const { getDistanceMatrix } = useDistance()
    const { returnFavorites } = useFavorites()
    const { loadReservations } = ReadApi()

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser?.id && 
        (item.status == "Confirmado" || item.status == "Recusado")
    )

    useEffect(() => {
        (async () => {
            try {
                
                let { status } = await Location.requestForegroundPermissionsAsync()

                if (status !== 'granted') {
                    setErrorMsg('Permissão de localização negada')
                    return
                }

                let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest })

                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                })
                
                setUserLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: latitudeDelta,
                    longitudeDelta: longitudeDelta
                })
            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token")
    
            if (!token) return navigation.replace("Login")

            if (token) {
                try {
                    const decoded = jwtDecode(token)
                    setDataUser(decoded.user)
                } catch (error) {
                    alert('Erro ao efetuar login:', error)
                    return navigation.replace("Login")
                }
            }
        })()
    }, [])

    useEffect(() => {
        if (dataUser?.id) {
            loadReservations(dataUser?.id)
            returnFavorites()
        }

    }, [dataUser])

    useEffect(() => {
        if (destination) {
            getDistanceMatrix()
        }
    }, [destination])

    useEffect(() => {
        if (findReservation[0]) {
            setReservaFeita(true)
        } else {
            setReservaFeita(false)
        }
    }, [reservations])

    if (!location.latitude || !location.longitude) {
        return <>
            <LoadingModal loading={loading} />
        </>
    }

    return <>
        <View
            style={[
                styles.container,
                {
                    justifyContent: (reservaFeita ? 'center' : 'flex-start')
                }
            ]}
        >
            <MainMap setLoading={setLoading} />
            
            <BotoesSuperiores />
            
            <EstouIndoPara />

            <Modal
                visible={modalPesquisar}
                transparent={true}
                onRequestClose={() => setModalPesquisar(false)}
                animationType='slide'
            >
                <Searching />
            </Modal>

            <InfoEstacionamento setErrorMsg={setErrorMsg} />

            <AcompanharReserva findReservation={findReservation[0]} />
        </View>
    </>
}