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
                        const res = await api.get(`/tabela_preco/${item.id}`)
                        const tabela = res.data

                        if (item.type_of_charge === "hora_fracao") {

                            return {
                                ...item,
                                valor_hora: tabela[0].valor_hora,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }

                        if (item.type_of_charge === "tabela_fixa") {
                            const response = await api.get(`/tabela_fixa/${item.id}`)
                            const tabelaFixa = response.data

                            return {
                                ...item,
                                valor_hora: tabelaFixa[0].value,
                                tempo_tolerancia: tabela[0].tempo_tolerancia,
                            }
                        }
                        
                        return item
                    } catch (error) {
                        console.error(error)
                        return item 
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