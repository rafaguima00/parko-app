import { useState, useEffect, useContext } from "react"
import { SafeAreaView, Modal, Alert } from "react-native"
import * as Location from "expo-location"
import { styles } from "./styles"
import { ReservaContext } from "../../Context/reservaContext"
import Searching from "./components/searching"
import { useUser } from "../../Context/dataUserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../Services/readData"
import LoadingModal from "../../Components/Loading"
import { latitudeDelta, longitudeDelta } from "../../Mocks/location"
import api from "../../Services/api"
import axios from "axios"
import { getFavoriteList } from "../../Mocks/errorOrRejected"
import BotoesSuperiores from "./components/botoesSuperiores"
import EstouIndoPara from "./components/estouIndoPara"
import InfoEstacionamento from "./components/infoEstacionamento"
import AcompanharReserva from "./components/acompanharReserva"
import MainMap from "./components/mainMap"

export default function MapaPrincipal({ navigation }) {

    const { loadReservations } = ReadApi()

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    })
    const [errorMsg, setErrorMsg] = useState(null)
    const [modalPesquisar, setModalPesquisar] = useState(false)
    const [loading, setLoading] = useState(true)

    const { 
        destination,
        setDestination,
        reservaFeita,
        reservations,
        setDistanceMatrix,
        setReservaFeita,
        setPriceTable
    } = useContext(ReservaContext)
    const { 
        setDataUser,
        setEstacionamentos,
        dataUser, 
        setFavorites
    } = useUser()
    
    async function getDistanceMatrix() {
        axios.get(`
            https://maps.googleapis.com/maps/api/distancematrix/json?destinations=${destination.latitude},%20${destination.longitude}&origins=${location.latitude},%20${location.longitude}&mode=driving&key=AIzaSyCIvlZb4r63Z8UI0Rr8kcbIiwQNR0i5XGQ
        `)
        .then(res => {
            setDistanceMatrix(res.data.rows[0].elements[0].duration.value)
        })
        .catch(e => {
            setDistanceMatrix(`Error`)
        })
    }

    async function returnFavorites() {
        try {
            const res = await api.get(`/favorites/${dataUser.id}`)

            const precoEstacionamento = await Promise.all(
                res.data.map(async (item) => {
                    try {
                        const res = await api.get(`/tabela_preco/${item.parking_id}`)

                        return {
                            ...item, 
                            tempo_tolerancia: res.data[0].tempo_tolerancia,
                            valor_hora: res.data[0].valor_hora
                        }
                    } catch (e) {
                        Alert.alert(getFavoriteList, e)
                    }
                })
            )

            setFavorites(precoEstacionamento)
        } catch (e) {
            setFavorites(getFavoriteList)
        }
    }

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser?.id && 
        (item.status == "Confirmado" || item.status == "Recusado")
    )

    async function loadParkings(location) {
        if (!location?.latitude || !location?.longitude) return

        try {
            const res = await api.get("/near-establishments", {
                params: {
                    user_lat: location?.latitude,
                    user_long: location?.longitude
                }
            })

            
            const estacionamentosComPreco = await Promise.all(
                res.data.map(async (item) => {
                    try {
                        const res = await api.get(`/tabela_preco/${item.id}`)
                        const tabela = res.data
                        

                        if (item.type_of_charge === "hora_fracao") {
                            setPriceTable(tabela)

                            return {
                                ...item,
                                valor_hora: tabela[0].valor_hora,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }

                        if (item.type_of_charge === "tabela_fixa") {
                            const response = await api.get(`/tabela_fixa/${item.id}`)
                            const tabelaFixa = response.data
                            setPriceTable(tabelaFixa)

                            return {
                                ...item,
                                valor_hora: tabelaFixa[0].value,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }

                        
                        return item
                    } catch (error) {
                        console.error("Erro ao carregar preço:", error)
                        return item 
                    }
                })
            )

            setEstacionamentos(estacionamentosComPreco.filter(Boolean))

        } catch (error) {
            Alert.alert("Erro ao carregar estacionamentos", error)
        }
    }

    const retornarCoordenadas = async ({ item }) => {
        try {
            setLoading(true)
            parkDestination(item)
        } catch (error) {
            Alert.alert("Erro ao retornar coordenadas:", error)
        } finally {
            setLoading(false)
        }
    }

    const parkDestination = (item) => {
        setDestination({
            ...item,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        })
        setLoading(false)
    }

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
        if (dataUser.id) {
            loadReservations()
            returnFavorites()
        }

    }, [dataUser])

    useEffect(() => {
        if (location?.latitude && location?.longitude) {
            loadParkings(location)
            setLoading(false)
        }
    }, [location])

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
        <SafeAreaView
            style={[
                styles.container,
                {
                    justifyContent: (reservaFeita ? 'center' : 'flex-start')
                }
            ]}
        >
            <MainMap location={location} retornarCoordenadas={retornarCoordenadas} />
            
            <BotoesSuperiores />
            
            <EstouIndoPara setModalPesquisar={setModalPesquisar} />

            <Modal
                visible={modalPesquisar}
                transparent={true}
                onRequestClose={() => setModalPesquisar(false)}
                animationType='slide'
            >
                <Searching 
                    setModalPesquisar={setModalPesquisar} 
                    retornarCoordenadas={retornarCoordenadas}
                />
            </Modal>

            <InfoEstacionamento location={location} setErrorMsg={setErrorMsg} />

            <AcompanharReserva findReservation={findReservation[0]} />
        </SafeAreaView>
    </>
}