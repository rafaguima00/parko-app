import React, { useEffect, useState } from "react"
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
            const searchResponse = await axios.get(
                `https://api.mercadopago.com/v1/customers/search?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )
        
            const cards = searchResponse.data.results[0].cards
        
            if (cards) {
                setCard(cards)
            }
        } catch (err) {
            console.log('Erro ao buscar cliente:', err.response?.data || err.message)
        }
        
        setLoading(false)
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
    }, [])

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
            <Botao
                children={"Adicionar"}
                largura={"100%"}
                corDeFundo={corPrimaria}
                negrito
                corDoTexto={"#fff"}
                aoPressionar={() => navigation.navigate("Cadastrar Cartao")}
            />
            <LoadingModal loading={loading} />
        </ScrollView>
    </>
}