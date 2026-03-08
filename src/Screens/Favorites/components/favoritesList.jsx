import { View, TouchableOpacity, Text, Alert } from "react-native"
import { ImageParking, styles } from "../style"
import { FontAwesome } from "react-native-vector-icons"
import { removeFavorite } from "../../../Mocks/errorOrRejected"
import api from "../../../Services/api"
import { useUser } from "../../../Context/dataUserContext"
import parking from "../../../../assets/image_shop.png"

const FavoritesList = ({ item }) => {

    const { dataUser, setFavorites } = useUser()

    async function removerFavorito(parkingId) {
        await api.delete("/favorites", { 
            data: {
                id_user: dataUser.id, 
                id_establishment: parkingId
            }
        })
        .then(res => {
            alert(res.data.message)

            setFavorites(prevFavorites => 
                prevFavorites.filter(item => item.parking_id !== parkingId)
            )
        })
        .catch(() => {
            alert(removeFavorite)
        })
    }

    return <>
        <View style={styles.dados}>
            <View style={styles.itens}>
                <ImageParking source={parking} />
                <Text style={styles.nome}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => {
                Alert.alert(
                    "Remover da lista",
                    `Deseja remover o estacionamento ${item.name} dos seus favoritos?`,
                    [
                        {
                            text: 'OK',
                            onPress: () => { removerFavorito(item.parking_id) },
                            style: styles.botaoOk
                        },
                        {
                            text: 'Cancelar',
                            onPress: () => {}
                        }
                    ]
                )
            }}>
                <FontAwesome name="trash-o" size={26} color="#545454" />
            </TouchableOpacity>
        </View>
    </>
}

export default FavoritesList