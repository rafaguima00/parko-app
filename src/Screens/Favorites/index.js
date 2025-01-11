import React, { useEffect } from "react"
import { Feather, FontAwesome } from "react-native-vector-icons"
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    Alert
} from "react-native"
import { ImageParking, Separator, styles } from "./style"
import { emptyFavorite } from "../../Mocks/emptyList"
import { useUser } from "../../Context/dataUserContext"
import api from "../../Services/api"
import parking from "../../../assets/image_shop.png"
import { getFavoriteList, removeFavorite } from "../../Mocks/errorOrRejected"

export default function Favorites({ navigation }) {

    const { favorites, setFavorites, dataUser } = useUser()

    async function returnFavorites() {
        await api.get(`/favorites/${dataUser.id}`)
        .then(res => {
            setFavorites(res.data)
        })
        .catch(e => {
            console.log(e)
            alert(getFavoriteList)
        })
    }

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

    useEffect(() => {
        returnFavorites()
    }, [])

    const renderItem = ({ item }) => {
        return (
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
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.mensagemVazio}>{emptyFavorite}</Text>
        )
    }

    return <View style={styles.areaContent}>
        <View style={styles.cabecalho}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={32} />
            </TouchableOpacity>
            <Text style={styles.topoFavoritos}>Favoritos</Text>
        </View>
        <FlatList
            data={favorites}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ListEmptyComponent={EmptyListMessage}
            ItemSeparatorComponent={() => <Separator />}
        />
    </View>
}