import { useState, useEffect, useRef, useContext } from "react"
import {
    SafeAreaView,
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
    Modal,
    Alert
} from "react-native"
import { Content } from "../../Components/Marker"
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import * as Location from "expo-location"
import {
    Feather,
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome
} from "react-native-vector-icons"
import { LinearGradient } from 'expo-linear-gradient'
import MapViewDirections from 'react-native-maps-directions'
import { styles } from "./styles"
import { theme } from "../../Theme"
import { Botao } from "../../Components/Botao"
import { GOOGLE_API_KEY } from "@env"
import { ReservaContext } from "../../Context/reservaContext"
import Searching from "./components/searching"
import { useUser } from "../../Context/dataUserContext"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { jwtDecode } from "jwt-decode"
import ReadApi from "../../Services/readData"
import { formatCurrency } from "../../Services/formatCurrency"
import LoadingModal from "../../Components/Loading"
import { latitudeDelta, longitudeDelta } from "../../Mocks/location"
import api from "../../Services/api"
import axios from "axios"
import { getFavoriteList } from "../../Mocks/errorOrRejected"

export default function MapaPrincipal({ navigation }) {

    const { loadReservations } = ReadApi()

    const [location, setLocation] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta,
        longitudeDelta,
    })
    const [errorMsg, setErrorMsg] = useState(null)
    const [modalPesquisar, setModalPesquisar] = useState(false)
    const [textoDigitado, setTextoDigitado] = useState("")
    const [itensFiltrados, setItensFiltrados] = useState([])
    const [loading, setLoading] = useState(true)

    const mapEl = useRef(null)

    const { 
        distance,
        setDistance,
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
        estacionamentos, 
        setEstacionamentos,
        dataUser, 
        setFavorites,
        favorites
    } = useUser()
    const { corFonteSecundaria, corPrimaria } = theme
    
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

    const filtrarItens = (text) => {
        if (text) {
            const resultadoPesquisa = estacionamentos.filter(
                item => item.name.toLowerCase().includes(text.toLowerCase())
            )
            setItensFiltrados(resultadoPesquisa)
        } else {
            setItensFiltrados([])
        }

        setTextoDigitado(text)
    }

    function directionsError(errorMsg) {
        Alert.alert("Erro de indicação de direção do mapa", errorMsg)
        setDestination(null)
    }

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser?.id && 
        (item.status == "Confirmado" || item.status == "Recusado")
    )

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

    function calcularDiferencaHoras(dataHoraInicial, dataHoraFinal) {
        // Converter as strings para objetos Date
        const [dataInicial, horaInicial] = dataHoraInicial.split(' ')
        const [dia1, mes1, ano1] = dataInicial.split('/').map(Number)
        const [h1, m1, s1] = horaInicial.split(':').map(Number)
      
        const [dataFinal, horaFinal] = dataHoraFinal.split(' ')
        const [dia2, mes2, ano2] = dataFinal.split('/').map(Number)
        const [h2, m2, s2] = horaFinal.split(':').map(Number)
      
        const inicio = new Date(ano1, mes1 - 1, dia1, h1, m1, s1)
        const fim = new Date(ano2, mes2 - 1, dia2, h2, m2, s2)
      
        // Calcular a diferença em milissegundos e converter para horas
        const diferencaMs = fim - inicio
        const diferencaHoras = diferencaMs / (1000 * 60 * 60)
      
        if(Math.ceil(diferencaHoras) > 1) {
            return `${Math.ceil(diferencaHoras)} horas`
        }

        return `${Math.ceil(diferencaHoras)} hora`
    }

    function dashboardNavigation() {
        if (!location?.latitude || !location?.longitude) {
            setErrorMsg("Erro ao calcular localização ou direção do usuário")
            return
        }

        return navigation.navigate('Dashboard')
    }

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
                            console.log(tabela)

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
            <MapView
                style={styles.map}
                initialRegion={location}
                showsUserLocation={true}
                loadingEnabled={true}
                mapType="standard"
                ref={mapEl}
                provider={PROVIDER_GOOGLE}
            >
                {estacionamentos.map((item) => (
                    <Marker
                        key={item.id}
                        coordinate={{
                            latitude: item.latitude,
                            longitude: item.longitude,
                        }}
                        title={formatCurrency(item.valor_hora)}
                        onPress={() => retornarCoordenadas({ item })}
                    >
                        <Content />
                    </Marker>
                ))}

                {destination &&
                    <MapViewDirections
                        origin={location}
                        destination={{
                            latitude: destination.latitude, 
                            longitude: destination.longitude
                        }}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={3}
                        strokeColor="#523499"
                        onError={errorMessage => directionsError(errorMessage)}
                        onReady={result => {
                            setDistance(result.distance)
                            mapEl.current.fitToCoordinates(
                                result.coordinates, {
                                    edgePadding: {
                                        top: 50,
                                        bottom: 50,
                                        right: 50,
                                        left: 50
                                    }
                                }
                            )
                        }}
                    />
                }
            </MapView>
            
            <View style={styles.componentesMapa}>
                <View 
                    style={[
                        styles.primeiraColuna, 
                        { left: (destination && !reservaFeita) ? 75 : 0 }
                    ]}
                >
                    <TouchableOpacity
                        style={styles.icone}
                        onPress={() => navigation.openDrawer()}
                    >
                        <Feather name="menu" size={28} />
                    </TouchableOpacity >

                    <TouchableOpacity
                        style={styles.icone}
                        onPress={() => navigation.navigate('Veiculos')}
                    >
                        <Ionicons name="car-outline" size={28} />
                    </TouchableOpacity>
                </View>

                {(destination && !reservaFeita) &&
                    <TouchableOpacity
                        style={[styles.icone, { position: "absolute", left: 0 }]}
                        onPress={() => {
                            setDestination(null)
                        }}
                    >
                        <Feather name="arrow-left" size={28} />
                    </TouchableOpacity>
                }
            </View>
            
            {(!destination && !reservaFeita) &&
                <KeyboardAvoidingView
                    behavior={Platform.OS == "ios" ? "padding" : "height"}
                >
                    <LinearGradient
                        style={(styles.buscar)}
                        colors={['#f4f4f4', '#f4f4f4']}
                        locations={[0, 1]}
                    >
                        <Text style={styles.estouIndoPara}>Estou indo para</Text>

                        <TouchableOpacity
                            style={{
                                backgroundColor: '#e9e9e9',
                                borderWidth: 1,
                                borderColor: corPrimaria,
                                borderRadius: 50,
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                paddingHorizontal: 16,
                                paddingVertical: 12
                            }}
                            onPress={() => setModalPesquisar(true)}
                        >
                            <Text style={{ color: corFonteSecundaria }}>Selecione seu destino</Text>
                            <Feather name='search' size={19} color='#7d7d7d' />
                        </TouchableOpacity>
                    </LinearGradient>
                </KeyboardAvoidingView>
            }

            <Modal
                visible={modalPesquisar}
                transparent={true}
                onRequestClose={() => setModalPesquisar(false)}
                animationType='slide'
            >
                <Searching 
                    state={{
                        setModalPesquisar, 
                        setTextoDigitado, 
                        setItensFiltrados,
                        itensFiltrados,
                        textoDigitado
                    }} 
                    filtrarItens={filtrarItens}
                    retornarCoordenadas={retornarCoordenadas}
                />
            </Modal>

            {(destination && !reservaFeita) &&
                <View style={styles.rotaEstacionamento}>
                    <Text style={styles.tituloEstacionamento}>{destination.name}</Text>
                    <View style={styles.infoEstacionamento}>
                        <View style={styles.infoAddress}>
                            <FontAwesome name="map-marker" size={18} color="#0097b9" />
                            <Text style={styles.localEstacionamento}>{destination.end}</Text>
                        </View>
                        <View style={styles.infoDistance}>
                            <MaterialCommunityIcons name="map-marker-distance" size={18} color="#7d7d7d" />
                            <Text style={styles.distanciaEstacionamento}>{distance?.toFixed(1)} km</Text>
                        </View>
                        <View style={styles.infoDistance}>
                            <Feather name="star" size={14} color="#7d7d7d" />
                            <Text style={styles.distanciaEstacionamento}>{destination.rate}</Text>
                        </View>
                    </View>
                    <View style={styles.viewButtons}>
                        <TouchableOpacity style={styles.botao} activeOpacity={1}>
                            <Feather name="dollar-sign" size={18} color="#7d7d7d" />
                            <Text style={styles.textoBotaoPreco}>
                                {`${Number(destination.valor_hora).toFixed(2).replace(".", ",")}/h`}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} activeOpacity={1}>
                            <Ionicons name="car" size={24} color="#7d7d7d" />
                            <Text style={styles.textoBotaoPreco}>
                                {parseInt(destination.numero_vagas) - parseInt(destination.vagas_ocupadas)}
                            </Text>
                        </TouchableOpacity>
                        <Botao
                            children={"Abrir"}
                            corDeFundo={corPrimaria}
                            largura={110}
                            corDoTexto={"#fff"}
                            negrito
                            aoPressionar={dashboardNavigation}
                            opacidade={0.7}
                        />
                    </View>
                </View>
            }

            {(reservaFeita && findReservation[0]) &&
                <View style={styles.itemLista}>
                    <View style={styles.viewEstacionamento}>
                        <Image 
                            style={{ width: 45, height: 45, borderRadius: 50, borderWidth: 2, borderColor: corPrimaria }}
                            source={{ uri: findReservation[0].image_url_establishment }} 
                            resizeMode="contain"
                        />
                        <Text style={styles.nomeEstacionamento}>{findReservation[0].establishment}</Text>
                    </View>
                    <View style={styles.viewReservation}>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Veículo</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItemCarro}>{findReservation[0].name_vehicle}</Text>
                                <Text style={styles.infoItemPlaca}>{findReservation[0].license_plate}</Text>
                                <Text style={styles.infoItemCor}>{findReservation[0].color}</Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Duração</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>
                                    {
                                        calcularDiferencaHoras(
                                            `${findReservation[0].data_entrada} ${findReservation[0].hora_entrada}`, 
                                            `${findReservation[0].data_saida} ${findReservation[0].hora_saida}`
                                        )
                                    }
                                </Text>
                                <Text style={styles.infoItem}>
                                    {`${findReservation[0].data_entrada}\n ${findReservation[0].hora_entrada}`}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Valor</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>{formatCurrency(findReservation[0].value)}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity 
                        style={styles.botaoReserva} 
                        onPress={() => { 
                            navigation.navigate('Tempo de Espera', {
                                idDestination: findReservation[0].id_establishment,
                                idReservation: findReservation[0].id
                            })
                        }}>
                        <Text style={styles.textoBotao}>Acompanhar reserva</Text>
                    </TouchableOpacity>
                </View>
            }
        </SafeAreaView>
    </>
}