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
import MapView, { Marker } from 'react-native-maps'
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
import { estacionamentos } from "../../Mocks/estacionamentos"
import { Botao } from "../../Components/Botao"
import historicoReservas from "../../Mocks/historicoReservas"
import { GOOGLE_API_KEY } from "@env"
import { ReservaContext } from "../../Context/reservaContext"
import Searching from "./components/searching"

export default function MapaPrincipal({ navigation }) {
    const [location, setLocation] = useState(null)
    const [errorMsg, setErrorMsg] = useState(null)
    
    const [modalPesquisar, setModalPesquisar] = useState(false)
    const [textoDigitado, setTextoDigitado] = useState("")
    const [itensFiltrados, setItensFiltrados] = useState([])

    const mapEl = useRef(null)

    const { 
        distance, 
        setDistance, 
        destination, 
        setDestination, 
        veiculoEscolhido,
        reservaFeita 
    } = useContext(ReservaContext)

    const filtrarItens = (text) => {
        if (text) {
            const resultadoPesquisa = estacionamentos.filter(
                item => item.title.toLowerCase().includes(text.toLowerCase())
            )
            setItensFiltrados(resultadoPesquisa)
        }
        setTextoDigitado(text)
    }

    const { corFonteSecundaria, corPrimaria } = theme

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

    const retornarCoordenadas = ({ item }) => {
        setDestination({
            latitude: item.coordinate.latitude,
            longitude: item.coordinate.longitude,
            latitudeDelta: 0.0143,
            longitudeDelta: 0.0134,
            address: item.address,
            image: item.image,
            title: item.title,
            precoBarato: item.horarios[0].preco,
            vagas: item.numeroVagas,
            avaliacao: item.avaliacao,
            horarioDeFuncionamento: item.horarioFuncionamento,
            taxaHoraExtra: item.taxaHoraExtra,
            taxaCancelamento: item.taxaCancelamento,
            tempoTolerancia: item.tempoTolerancia,
            horarios: item.horarios
        })
    }

    if (!location) {
        return (
            <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
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
                showsUserLocation
                loadingEnabled
                mapType="mutedStandard"
                ref={mapEl}
            >
                {estacionamentos.map((item, index) => (
                    <Marker
                        key={index}
                        coordinate={{
                            latitude: item.coordinate.latitude,
                            longitude: item.coordinate.longitude,
                        }}
                        title={`R$ ${item.horarios[0].preco}`}
                        onPress={() => retornarCoordenadas({
                            item, 
                            latitude: item.coordinate.latitude,
                            longitude: item.coordinate.longitude,
                        })}
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

                {(destination && !reservaFeita ) &&
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

            {(destination && !reservaFeita ) &&
                <View style={styles.rotaEstacionamento}>
                    <Text style={styles.tituloEstacionamento}>{destination.title}</Text>
                    <View style={styles.infoEstacionamento}>
                        <View style={styles.infoAddress}>
                            <FontAwesome name="map-marker" size={18} color="#0097b9" />
                            <Text style={styles.localEstacionamento}>{destination.address}</Text>
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
                            <Text style={styles.textoBotaoPreco}>{destination.precoBarato}/h</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.botao} activeOpacity={1}>
                            <Ionicons name="car" size={24} color="#7d7d7d" />
                            <Text style={styles.textoBotaoPreco}>{destination.vagas}</Text>
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

            {reservaFeita &&
                <View style={styles.itemLista}>
                    <View style={styles.viewEstacionamento}>
                        <Image 
                            style={{ width: 45, height: 45, borderRadius: 50, borderWidth: 2, borderColor: corPrimaria }}
                            source={{ uri: destination.image }} 
                        />
                        <Text style={styles.nomeEstacionamento}>{destination.title}</Text>
                    </View>
                    <View style={styles.viewReservation}>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>{historicoReservas[0].veiculo}</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItemCarro}>{veiculoEscolhido.nome}</Text>
                                <Text style={styles.infoItemPlaca}>{veiculoEscolhido.placa}</Text>
                                <Text style={styles.infoItemCor}>{veiculoEscolhido.cor}</Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>{historicoReservas[0].duracao}</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>{historicoReservas[0].tempoPermanencia}</Text>
                                <Text style={styles.infoItem}>{historicoReservas[0].dataEntrada}</Text>
                            </View>
                        </View>
                        <View style={styles.infoVeiculo}>
                            <Text style={styles.textoInicio}>{historicoReservas[0].valor}</Text>
                            <View style={styles.textoVeiculo}>
                                <Text style={styles.infoItem}>{historicoReservas[0].quantidadeValor}</Text>
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