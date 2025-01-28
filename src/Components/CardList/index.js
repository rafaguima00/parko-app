import React, { useEffect } from "react"
import { Alert, Text, View, Image } from "react-native"
import { BotaoExcluir, DadosCartao, ViewCard } from "./style"
import { useUser } from "../../Context/dataUserContext"
import DeleteCard from "../../Services/DeleteCard"
import { usePayment } from "../../Context/paymentContext"
import { ACCESS_TOKEN } from "@env"
import axios from "axios"

const CardList = ({ item }) => {

    const { cartaoSelecionado, setCartaoSelecionado, setTokenCard, tokenCard } = usePayment()
    const { dataUser } = useUser()
    const { deletarCartoes } = DeleteCard()

    function cardholderName(first, last) {
        const replaced = first.replace(/[0-9]/g, "•")

        return `${replaced} ${last}`
    }

    function handleCardPress(id) {
        setCartaoSelecionado((prevState) => (prevState === id ? null : id))
    }
    
    async function gerarTokenCard(card_id) {
        try {
            const response = await axios.post(
                "https://api.mercadopago.com/v1/card_tokens",
                { card_id },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "application/json"
                    }
                }
            )
            
            console.log(response.data.id)
            setTokenCard(response.data.id)
            return response.data.id
        } catch (error) {
            console.error("Erro ao gerar token do cartão:", error.response?.data || error.message)
            throw new Error("Não foi possível gerar o token do cartão.")
        }
    }
    
    useEffect(() => {
        if(cartaoSelecionado) {
            gerarTokenCard(cartaoSelecionado.id)
            console.log(cartaoSelecionado)
        }
    }, [cartaoSelecionado])

    useEffect(() => {
        if(tokenCard) {
            console.log(tokenCard)
        }
    }, [tokenCard])

    return <>
        <ViewCard
            activeOpacity={0.9}
            onPress={() => handleCardPress(item)}
            ativo={cartaoSelecionado === item}
        >
            <BotaoExcluir
                onPress={() => {
                    Alert.alert(
                        "Excluir cartão de crédito",
                        `Tem certeza de que deseja excluir este cartão?`,
                        [
                            {
                                text: 'OK',
                                onPress: () => deletarCartoes(dataUser.email, item.id)
                            },
                            {
                                text: 'Cancelar'
                            }
                        ]
                    )
                }}
            >
                <Text>X</Text>
            </BotaoExcluir>
            <View style={{ gap: 12, justifyContent: 'flex-start' }}>
                <DadosCartao>{item.cardholder.name}</DadosCartao>
                <DadosCartao>{cardholderName(item.first_six_digits, item.last_four_digits)}</DadosCartao>
                <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                    <DadosCartao>{item.expiration_month}/{item.expiration_year}</DadosCartao>
                </View>
            </View>
            <Image 
                source={{ uri: item.payment_method.secure_thumbnail }}
                style={{ width: 88, height: 28 }}
            />
        </ViewCard>
    </>
}

export default CardList