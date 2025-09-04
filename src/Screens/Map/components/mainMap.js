import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { styles } from "../styles"
import { Content } from "../../../Components/Marker"
import { formatCurrency } from "../../../Services/formatCurrency"
import { Alert } from "react-native"
import MapViewDirections from "react-native-maps-directions"
import { GOOGLE_API_KEY, STATUS_APP } from "@env"
import { theme } from "../../../Theme"
import { useContext, useRef } from "react"
import { ReservaContext } from "../../../Context/reservaContext"
import { useUser } from "../../../Context/dataUserContext"

const MainMap = (props) => {

    const { location, retornarCoordenadas } = props
    const { corRoxa } = theme
    const { destination, setDestination, setDistance } = useContext(ReservaContext)
    const { estacionamentos } = useUser()

    const mapEl = useRef(null)
    
    const directionsError = (errorMsg) => {
        if (STATUS_APP === "test") return
        
        Alert.alert("Erro de indicação de direção do mapa", errorMsg)
        setDestination(null)
    }

    return <>
        <MapView
            style={styles.map}
            initialRegion={location}
            showsUserLocation={true}
            loadingEnabled={true}
            mapType="standard"
            ref={mapEl}
            provider={PROVIDER_GOOGLE}
        >
            {estacionamentos.map(item => (
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
                        latitude: destination?.latitude, 
                        longitude: destination?.longitude
                    }}
                    apikey={GOOGLE_API_KEY}
                    strokeWidth={3}
                    strokeColor={corRoxa}
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
    </>
}

export default MainMap