import React, { useEffect } from "react"
import {
    Text,
    FlatList,
    SafeAreaView
} from "react-native"
import { Separator, styles } from "./style"
import { emptyFavorite } from "../../Mocks/emptyList"
import { useUser } from "../../Context/dataUserContext"
import api from "../../Services/api"
import { getFavoriteList } from "../../Mocks/errorOrRejected"
import TopArrowLeft from "../../Components/TopArrowLeft"
import FavoritesList from "./components/favoritesList"

export default function Favorites() {

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

    useEffect(() => {
        returnFavorites()
    }, [])

    const EmptyListMessage = () => {
        return (
            <Text style={styles.mensagemVazio}>{emptyFavorite}</Text>
        )
    }

    return <>
        <SafeAreaView style={styles.areaContent}>
            <TopArrowLeft children={"Favoritos"} />
            <FlatList
                style={{ marginTop: 26, marginHorizontal: 26 }}
                data={favorites}
                renderItem={item => <FavoritesList {...item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                ItemSeparatorComponent={() => <Separator />}
            />
        </SafeAreaView>
    </>
}