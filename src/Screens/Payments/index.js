import { useEffect, useState } from "react"
import { 
    Text, 
    View, 
    Image,
    FlatList,
    ScrollView
} from "react-native"
import cartao from "../../../assets/image_money.png"
import { theme } from "../../Theme"
import { styles } from "./style"
import { Botao } from "../../Components/Botao"
import { emptyCard } from "../../Mocks/emptyList"
import axios from "axios"
import { ACCESS_TOKEN } from "@env"
import { useUser } from "../../Context/dataUserContext"
import { usePayment } from "../../Context/paymentContext"
import LoadingModal from "../../Components/Loading"
import CardList from "../../Components/CardList"
import TopArrowLeft from "../../Components/TopArrowLeft"

export default function Payments({ navigation }) {

    const [loading, setLoading] = useState(true)

    const { dataUser } = useUser()
    const { setCard, card, cartaoSelecionado, setCartaoSelecionado } = usePayment()
    const { corPrimaria } = theme

    async function getCostumerCard(email) {
        try {
            if (!email) return

            const searchResponse = await axios.get(
                `https://api.mercadopago.com/v1/customers/search?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )

            const results = searchResponse.data.results

            if (results.length === 0) {
                // Se o cliente não existir -> cria
                const response = await axios.post(
                    'https://api.mercadopago.com/v1/customers',
                    { email },
                    {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                    }
                )

                return response.data
            }

            // Cliente existe
            const existingCustomer = results[0]

            if (existingCustomer.cards?.length > 0) {
                const filterCards = existingCustomer.cards.filter(item => item.customer_id === existingCustomer.id)
                setCard(filterCards)
            } else {
                console.log("Cliente ainda não tem cartões salvos")
            }

            return existingCustomer

        } catch (err) {
            console.log('Erro ao buscar cliente:', err.response?.data || err.message)
            throw err
        } finally {
            setLoading(false)
        }
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.avisoCartao}>
                {emptyCard}
            </Text>
        )
    }

    useEffect(() => {
        getCostumerCard(dataUser.email)
    }, [dataUser])

    return <>
        <ScrollView contentContainerStyle={styles.areaContent}>
            <TopArrowLeft children={"Pagamento"} />
            <View style={styles.circuloAzul}>
                <Image source={cartao} style={styles.imagemCard} />
            </View>
            <Text style={styles.selectVehicle}>Selecione seu cartão</Text>
            <FlatList
                style={{ marginTop: 10, marginBottom: 46, paddingTop: 10 }}
                horizontal
                data={card}
                renderItem={item => (
                    <CardList 
                        {...item} 
                        cartaoSelecionado={cartaoSelecionado}
                        setCartaoSelecionado={setCartaoSelecionado}
                    />
                )}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                showsHorizontalScrollIndicator={false}
            />
            <View style={{ alignItems: "center" }}>
                <Botao
                    children={"Adicionar"}
                    largura={"100%"}
                    corDeFundo={corPrimaria}
                    negrito
                    corDoTexto={"#fff"}
                    aoPressionar={() => navigation.navigate("Cadastrar Cartao")}
                />
            </View>
            <LoadingModal loading={loading} />
        </ScrollView>
    </>
}