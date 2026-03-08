import { Alert } from "react-native"
import { useUser } from "../Context/dataUserContext"
import api from "../Services/api"
import { getFavoriteList } from "../Mocks/errorOrRejected"

const useFavorites = () => {

    const { dataUser, setFavorites } = useUser()

    async function returnFavorites() {
        try {
            const res = await api.get(`/favorites/${dataUser?.id}`)

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

    return { returnFavorites }

}

export default useFavorites