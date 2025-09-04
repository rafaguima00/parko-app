import { Text, TouchableOpacity, View, Dimensions } from "react-native"
import { styles } from "../styles"
import { Botao } from "../../../Components/Botao"
import { useNavigation } from "@react-navigation/native"
import { theme } from "../../../Theme"
import { Feather, FontAwesome, Ionicons, MaterialCommunityIcons } from "react-native-vector-icons"
import { useContext, useEffect } from "react"
import { ReservaContext } from "../../../Context/reservaContext"

const InfoEstacionamento = (props) => {

    const { location, setErrorMsg } = props
    const { corPrimaria } = theme
    const navigation = useNavigation()
    const { destination, distance, reservaFeita } = useContext(ReservaContext)
    const { end, name, numero_vagas, rate, vagas_ocupadas, valor_hora } = destination ?? {}
    const width = Dimensions.get("screen").width
    const isTablet = width >= 750

    function dashboardNavigation() {
        if (!location?.latitude || !location?.longitude) {
            setErrorMsg("Erro ao calcular localização ou direção do usuário")
            return
        }

        return navigation.navigate('Dashboard')
    }

    return <>
        {(destination && !reservaFeita) &&
            <View style={styles.rotaEstacionamento}>
                <Text style={styles.tituloEstacionamento}>{name}</Text>
                <View style={styles.infoEstacionamento}>
                    <View style={styles.infoAddress}>
                        <FontAwesome name="map-marker" size={18} color="#0097b9" />
                        <Text style={styles.localEstacionamento}>{end}</Text>
                    </View>
                    <View style={styles.infoDistance}>
                        <MaterialCommunityIcons name="map-marker-distance" size={18} color="#7d7d7d" />
                        <Text style={styles.distanciaEstacionamento}>{distance?.toFixed(1)} km</Text>
                    </View>
                    <View style={styles.infoDistance}>
                        <Feather name="star" size={14} color="#7d7d7d" />
                        <Text style={styles.distanciaEstacionamento}>{rate}</Text>
                    </View>
                </View>
                <View style={styles.viewButtons}>
                    <TouchableOpacity style={styles.botao} activeOpacity={1}>
                        <Feather name="dollar-sign" size={18} color="#7d7d7d" />
                        <Text style={styles.textoBotaoPreco}>
                            {`${Number(valor_hora).toFixed(2).replace(".", ",")}/h`}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao} activeOpacity={1}>
                        <Ionicons name="car" size={24} color="#7d7d7d" />
                        <Text style={styles.textoBotaoPreco}>
                            {parseInt(numero_vagas) - parseInt(vagas_ocupadas)}
                        </Text>
                    </TouchableOpacity>
                    <Botao
                        children={"Abrir"}
                        corDeFundo={corPrimaria}
                        largura={isTablet ? 200 : 110}
                        corDoTexto={"#fff"}
                        negrito
                        aoPressionar={dashboardNavigation}
                        opacidade={0.7}
                    />
                </View>
            </View>
        }
    </>
}

export default InfoEstacionamento