import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { styles } from "../styles"
import { Content } from "../../../Components/Marker"
import { formatCurrency } from "../../../Utils/formatCurrency"
import { Alert } from "react-native"
import MapViewDirections from "react-native-maps-directions"
import { GOOGLE_API_KEY, STATUS_APP } from "@env"
import { theme } from "../../../Theme"
import { useRef } from "react"
import { useReservation } from "../../../Context/reservaContext"
import { useUser } from "../../../Context/dataUserContext"
import { mapStyle } from "../../../Mocks/mapStyle"
import useDistance from "../hooks/useDestination"
import LoadingModal from "../../../Components/Loading"

const MainMap = (props) => {

    const { setLoading } = props
    const { corRoxa } = theme
    const { destination, setDestination, setDistance } = useReservation()
    const { estacionamentos, location, userLocation } = useUser()
    const { retornarCoordenadas } = useDistance()

    const mapEl = useRef(null)
    
    const directionsError = (errorMsg) => {
        if (STATUS_APP === "test") return
        
        Alert.alert("Erro de indicação de direção do mapa", errorMsg)
        setDestination(null)
    }

    return <>
        <MapView
            style={styles.map}
            region={location}
            showsUserLocation={true}
            loadingEnabled={true}
            mapType="standard"
            ref={mapEl}
            provider={PROVIDER_GOOGLE}
            showsPointsOfInterest={false}
            customMapStyle={mapStyle}
        >
            {estacionamentos.map(item => (
                <Marker
                    key={item.id}
                    coordinate={{
                        latitude: item.latitude,
                        longitude: item.longitude,
                    }}
                    title={formatCurrency((item?.valor_hora) * 0.95)}
                    onPress={() => retornarCoordenadas({ item }, setLoading)}
                >
                    <Content />
                </Marker>
            ))}

            {destination &&
                <MapViewDirections
                    origin={userLocation}
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