import React, { useState, useEffect, useRef, useContext } from "react"
import {
    View,
    Text,
    KeyboardAvoidingView,
    Platform,
    TouchableOpacity,
    Image,
    Modal
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

export default function MapaPrincipal({ navigation }) {

    const { loadParkings, loadPriceTable, loadReservations } = ReadApi()

    const [location, setLocation] = useState(null)
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
        veiculoEscolhido,
        reservaFeita,
        horaReserva,
        reservations
    } = useContext(ReservaContext)

    const { setDataUser, estacionamentos, priceTable, dataUser } = useUser()
    const { corFonteSecundaria, corPrimaria } = theme

    const filtrarItens = (text) => {
        if (text) {
            const resultadoPesquisa = estacionamentos.filter(
                item => item.name.toLowerCase().includes(text.toLowerCase())
            )
            setItensFiltrados(resultadoPesquisa)
        }
        setTextoDigitado(text)
    }

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser.id && 
        (item.status == "Pendente" || item.status == "Confirmado")
    )

    useEffect(() => {
        (async () => {

            try {
                
                let { status } = await Location.requestForegroundPermissionsAsync()

                let location = await Location.getCurrentPositionAsync({})
                setLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0143,
                    longitudeDelta: 0.0134
                })

                if (status !== 'granted') {
                    setErrorMsg('Permissão de localização negada')
                    return
                }
            } catch (error) {
                console.log(error)
            }
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const token = await AsyncStorage.getItem("token")
    
            if(token) {
                const decoded = jwtDecode(token)
                setDataUser(decoded.user)
            } else {
                return navigation.replace("Login")
            }
        })()

        loadParkings()
        loadReservations()
    }, [])

    useEffect(() => {
        if(findReservation) {
            // in case of reservation in progress show the info of reservation
        }

        setLoading(false)
    }, [reservations])

    const retornarCoordenadas = ({ item }) => {

        loadPriceTable(item.id)

        setDestination({
            id: item.id,
            latitude: item.latitude,
            longitude: item.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            end: item.end,
            image: item.image,
            name: item.name,
            price: priceTable.valor_hora,
            vagas: item.numero_vagas,
            vagas_ocupadas: item.vagas_ocupadas,
            avaliacao: item.rate,
            tempo_tolerancia: priceTable.tempo_tolerancia
        })
    }

    if (!location || loading) {
        return (
            <View 
                style={[
                    styles.container, 
                    { 
                        alignItems: 'center', 
                        justifyContent: 'center' 
                    }
                ]}
            >
                <Text>Carregando...</Text>
            </View>
        );
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
            <MapView
                style={styles.map}
                initialRegion={location}
                showsUserLocation={true}
                loadingEnabled={true}
                mapType="mutedStandard"
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
                        title={`R$ 10,00`}
                        onPress={() => retornarCoordenadas({ item })}
                    >
                        <Content />
                    </Marker>
                ))}

                {destination &&
                    <MapViewDirections
                        origin={location}
                        destination={destination}
                        apikey={GOOGLE_API_KEY}
                        strokeWidth={3}
                        strokeColor="#523499"
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

                {(destination && !reservaFeita) &&
                    <TouchableOpacity
                        style={[styles.icone, { position: "absolute", right: 0 }]}
                        onPress={() => {
                            setDestination(null)
                        }}
                    >
                        <Feather name="arrow-left" size={32} />
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
                            <Text style={styles.distanciaEstacionamento}>{destination.avaliacao}</Text>
                        </View>
                    </View>
                    <View style={styles.viewButtons}>
                        <TouchableOpacity style={styles.botao} activeOpacity={1}>
                            <Feather name="dollar-sign" size={18} color="#7d7d7d" />
                            <Text style={styles.textoBotaoPreco}>{destination.price}/h</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} activeOpacity={1}>
                            <Ionicons name="car" size={24} color="#7d7d7d" />
                            <Text style={styles.textoBotaoPreco}>
                                {parseInt(destination.vagas) - parseInt(destination.vagas_ocupadas)}
                            </Text>
                        </TouchableOpacity>
                        <Botao
                            children={"Abrir"}
                            corDeFundo={corPrimaria}
                            largura={110}
                            corDoTexto={'#fff'}
                            negrito
                            aoPressionar={() => {
                                navigation.navigate('Dashboard')
                            }}
                        />
                    </View>
                </View>
            }

            {/* {!findReservation &&
                <View style={styles.itemLista}>
                    <ActivityIndicator size="large" />
                </View>
            } */}

            {(reservaFeita && findReservation) &&
                <View style={styles.itemLista}>
                    <View style={styles.viewEstacionamento}>
                        <Image 
                            style={{ width: 45, height: 45, borderRadius: 50, borderWidth: 2, borderColor: corPrimaria }}
                            source={{ uri: destination.image }} 
                        />
                        <Text style={styles.nomeEstacionamento}>{destination.name}</Text>
                    </View>
                    <View style={styles.viewReservation}>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Veículo</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItemCarro}>{veiculoEscolhido.item.name}</Text>
                                <Text style={styles.infoItemPlaca}>{veiculoEscolhido.item.license_plate}</Text>
                                <Text style={styles.infoItemCor}>{veiculoEscolhido.item.color}</Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Duração</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>1 hora</Text>
                                <Text style={styles.infoItem}>{horaReserva}</Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>Valor</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>{formatCurrency(10)}</Text>
                            </View>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.botaoReserva} onPress={() => { navigation.navigate('Tempo de Espera') }}>
                        <Text style={styles.textoBotao}>Acompanhar reserva</Text>
                    </TouchableOpacity>
                </View>
            }
        </View>
    </>
}