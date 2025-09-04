import { useState, useContext, useEffect } from "react"
import { 
    View, 
    TouchableOpacity,
    Modal,
    ActivityIndicator,
    StyleSheet,
    ImageBackground,
    Dimensions
} from "react-native"
import { 
    Feather, 
    MaterialIcons, 
    FontAwesome, 
    Ionicons, 
    MaterialCommunityIcons 
} from "react-native-vector-icons"
import { ReservaContext } from "../../../../Context/reservaContext"
import { useUser } from "../../../../Context/dataUserContext"
import { 
    BotoesSuperiores, 
    InfoEstacionamento, 
    Nome, 
    Local, 
    Endereco, 
    Icons, 
    TextIcon 
} from "./style"
import api from "../../../../Services/api"
import { addFavorite, removeFavorite } from "../../../../Mocks/errorOrRejected"
import { addFavoriteConfirmed } from "../../../../Mocks/confirmed"

const { width } = Dimensions.get("screen")
const isTablet = width >= 750

function Topo({ handleImageLoaded, voltar }) {

    const [favoritoAtivado, setFavoritoAtivado] = useState(false)
    const [loading, setLoading] = useState(false)

    const { dataUser } = useUser()
    const { destination, distance } = useContext(ReservaContext)
    const { id, image, name, end, numero_vagas, rate, vagas_ocupadas } = destination

    async function adicionarAosFavoritos() {
        setLoading(true)

        if(favoritoAtivado === false) {
            await api.post("/favorites", { 
                id_user: dataUser.id, 
                id_establishment: id
            })
            .then(() => {
                setFavoritoAtivado(true)
                alert(addFavoriteConfirmed)
            })
            .catch(() => {
                alert(addFavorite)
            })

        } else {
            await api.delete("/favorites", { 
                data: {
                    id_user: dataUser.id, 
                    id_establishment: id
                }
            })
            .then(res => {
                setFavoritoAtivado(false)
                alert(res.data.message)
            })
            .catch(() => {
                alert(removeFavorite)
            })
        }

        setLoading(false)
    }

    async function retornarFavorito() {
        await api.get(`/favorites/${dataUser.id}`)
            .then(res => {
                const result = res.data
                const filterResult = result.find(item => item.parking_id == destination.id)
                
                if(filterResult) {
                    setFavoritoAtivado(true)
                }
            })
            .catch(() => {
                console.log("Erro ao verificar estacionamento favorito")
            })
    }

    useEffect(() => {
        retornarFavorito()
    }, [])

    return(
        <View>
            <View>
                <ImageBackground
                    source={require("../../../../../assets/image_shop.png")} 
                    style={estilo.imageBackground} 
                    onLoad={handleImageLoaded} 
                />  
            </View>
            <View style={estilo.overlay}></View>
            <BotoesSuperiores>
                <TouchableOpacity onPress={voltar} >
                    <Feather name="arrow-left" size={32} color="#fff" style={{ padding: 30 }} />
                </TouchableOpacity>
                <TouchableOpacity 
                    activeOpacity={0.9} 
                    onPress={adicionarAosFavoritos}
                >
                    <MaterialIcons 
                        name={(favoritoAtivado ? "favorite" : "favorite-border")} 
                        size={28} 
                        color={(favoritoAtivado ? "red" : "#fff")} 
                        style={{ padding: 30 }}
                    />
                </TouchableOpacity>
            </BotoesSuperiores>
            <InfoEstacionamento>
                <Nome>{name || ""}</Nome>
                <Local>
                    <MaterialCommunityIcons name="map-marker" size={14} color="#f4f4f4" />
                    <Endereco>{end || ""}</Endereco>
                </Local>
                <Icons>
                    <FontAwesome name="arrows-h" size={16} color="#0097b9" />
                    <TextIcon>{distance ? `${distance.toFixed(1)} km` : ""}</TextIcon>

                    <Ionicons name="car" size={20} color="#0097b9" />
                    <TextIcon>
                        {numero_vagas && parseInt(numero_vagas) - parseInt(vagas_ocupadas)} vagas
                    </TextIcon>

                    <Feather name="star" size={20} color="#0097b9" />
                    <TextIcon>{rate ? rate : "n/a"}</TextIcon>
                </Icons>
            </InfoEstacionamento>
            <Modal
                visible={loading}
                transparent={true}
                onRequestClose={() => {}}
                animationType="fade"
            >
                <View
                    style={{
                        backgroundColor: "rgba(125, 125, 125, 0.6)",
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center"
                    }}
                >
                    <ActivityIndicator size={"small"} color={"#fff"} />
                </View>
            </Modal> 
        </View>
    )
}

const estilo = StyleSheet.create({
    imageBackground: { 
        width: "100%", 
        aspectRatio: isTablet ? 16 / 7 : 16 / 9
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // preenche todo o espaço do ImageBackground
        backgroundColor: "#000",
        opacity: 0.4
    }
})

export default Topo