import React from "react"
import { Alert, View, Image } from "react-native"
import { BotaoExcluir, DadosCartao, ViewCard } from "./style"
import { useUser } from "../../Context/dataUserContext"
import DeleteCard from "../../Services/DeleteCard"
import { Feather } from "react-native-vector-icons"
import master from "../../../assets/Group-90.png"
import visa from "../../../assets/Group-85.png"

const CardList = ({ item, cartaoSelecionado, setCartaoSelecionado }) => {

    const { dataUser } = useUser()
    const { deletarCartoes } = DeleteCard()

    function cardholderName(first, last) {
        const replaced = first.replace(/[0-9]/g, "•")

        return `${replaced} ${last}`
    }

    function handleCardPress(id) {
        setCartaoSelecionado(id)
    }

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
                <Feather name="x" color="#000" size={15} />
            </BotaoExcluir>
            <View style={{ gap: 12, justifyContent: 'flex-start' }}>
                <DadosCartao>{item.cardholder.name}</DadosCartao>
                <DadosCartao>{cardholderName(item.first_six_digits, item.last_four_digits)}</DadosCartao>
                <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                    <DadosCartao>{item.expiration_month}/{item.expiration_year}</DadosCartao>
                </View>
            </View>
            <Image 
                source={{ uri: item.payment_method.thumbnail }}
                style={{ width: 45, height: 45 }}
                resizeMode="contain"
            />
        </ViewCard>
    </>
}

export default CardList