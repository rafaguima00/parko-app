import React, { useContext, useEffect, useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native'
import { theme } from "../../../Theme"
import { Botao } from "../../../Components/Botao"
import { 
    BotaoFechar, 
    BotaoVoltar, 
    FundoCinza, 
    ItemTotal, 
    LeftText, 
    RightText, 
    styles, 
    Taxas, 
    TopoBotao 
} from "../style"
import { Feather } from "react-native-vector-icons"
import { emptyCard } from "../../../Mocks/emptyList"
import { formatCurrency } from "../../../Services/formatCurrency"
import { ReservaContext } from "../../../Context/reservaContext"
import { usePayment } from "../../../Context/paymentContext"
import CardList from "../../../Components/CardList"
import { useUser } from "../../../Context/dataUserContext"
import axios from "axios"
import { ACCESS_TOKEN } from "@env"
import LoadingModal from "../../../Components/Loading"

const { fonteNegrito, corPrimaria } = theme

export default function ModalPagamento({ 
    abreModalAddCard, 
    openModalSelecionarPgto, 
    setModalEstendeHora,
    setModalPagamento,
    setModalConfirma
}) {

    const [loading, setLoading] = useState(false)

    const { 
        valorPreSelecionado,
        setItemPreSelecionado,
        itemPreSelecionado
    } = useContext(ReservaContext)
    
    const { setCard, card, cartaoSelecionado, setCartaoSelecionado } = usePayment()
    const { dataUser } = useUser()

    let reserva = valorPreSelecionado * 0.95
    let taxaAdicional = (reserva * 0.1) + 0.06
    let total = reserva + taxaAdicional

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

    function pagamentoConfirmado() {
        setItemPreSelecionado({ ...itemPreSelecionado, value: total })
        setModalPagamento(false)
        setModalConfirma(true)
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
        <View style={styles.modalContainer}>
            <View style={[styles.dashContent, estilos.escolher]}>
                <TopoBotao espacamento={16}>
                    <BotaoVoltar 
                        activeOpacity={0.7} 
                        onPress={() => {
                            setModalPagamento(false)
                            setModalEstendeHora(true)
                        }}
                    >
                        <Feather name="arrow-left" size={32} color="#444" />
                    </BotaoVoltar>
                    <BotaoFechar activeOpacity={0.7} onPress={() => setModalPagamento(false)}>
                        <Feather name="x" size={32} color="#444" />
                    </BotaoFechar>
                </TopoBotao>
                <View style={{alignItems: 'center'}} >
                    <Text style={estilos.tituloPrincipal}>Pagamento</Text>
                </View>
                <View 
                    style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'space-between', 
                        marginHorizontal: 22
                    }}
                >
                    <Text style={estilos.txtSelecioneCartao} >Selecione seu cartão de crédito</Text>
                    <TouchableOpacity onPress={abreModalAddCard}>
                        <Text style={estilos.botaoMais}>+</Text>
                    </TouchableOpacity>
                </View>
                <FlatList
                    style={{ marginLeft: 20, marginBottom: 32, paddingTop: 10 }}
                    horizontal={card.length > 0 ? true : false}
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
                <View style={{justifyContent: 'center'}} >
                    <TouchableOpacity onPress={openModalSelecionarPgto} >
                        <Text style={estilos.escolherFormaPgto}>Escolher outra forma de pagamento</Text>
                    </TouchableOpacity>
                </View>
                <Taxas>
                    <ItemTotal>
                        <LeftText>TOTAL</LeftText>
                        <RightText>
                            {formatCurrency(total)}
                        </RightText>
                    </ItemTotal>
                    <FundoCinza>
                        <LeftText>Reserva</LeftText>
                        <RightText>{formatCurrency(reserva)}</RightText>
                    </FundoCinza>
                    <FundoCinza>
                        <LeftText>Taxa Adicional</LeftText>
                        <RightText>{formatCurrency(taxaAdicional)}</RightText>
                    </FundoCinza>
                </Taxas>
                <View 
                    style={{ 
                        alignItems: 'center', 
                        justifyContent: "center", 
                        width: '100%', 
                        marginBottom: 32, 
                        marginTop: 16 
                    }} 
                >
                    <Botao
                        children={"Confirmar"}
                        corDeFundo={cartaoSelecionado ? corPrimaria : "rgba(125, 125, 125, 0.4)"}
                        largura={'85%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={pagamentoConfirmado}
                        opacidade={0.7}
                        disabled={cartaoSelecionado ? false : true}
                    />
                </View>
            </View>
        </View>
        <LoadingModal loading={loading} />
    </>
}

const estilos = StyleSheet.create({
    escolher: {
        backgroundColor: '#DCEBEE'
    },
    tituloPrincipal: {
        lineHeight: 35, 
        fontSize: 24, 
        fontFamily: fonteNegrito,
        color: '#444'
    },
    txtSelecioneCartao: {
        lineHeight: 35, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        fontSize: 15
    },
    botaoMais: {
        fontSize: 44, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular'
    },
    avisoCartao: {
        textAlign: 'center', 
        marginVertical: 80, 
        marginHorizontal: 20, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        lineHeight: 19, 
        fontSize: 16
    },
    imagecard: {
        marginRight: 28,
        marginTop: 10
    },
    escolherFormaPgto: {
        textAlign: 'center', 
        textDecorationLine: 'underline',
        color: '#7d7d7d',
        lineHeight: 17
    },
    itemTotal: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        marginBottom: 20,
        marginTop: 13,
        marginHorizontal: 22,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderLeftWidth: 5,
        borderColor: corPrimaria
    }
})