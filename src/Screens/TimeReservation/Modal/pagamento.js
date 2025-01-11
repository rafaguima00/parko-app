import React, { useContext, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { theme } from "../../../Theme"
import { Botao } from "../../../Components/Botao"
import { BotaoFechar, BotaoVoltar, FundoCinza, ItemTotal, LeftText, RightText, styles, Taxas, TopoBotao } from "../style"
import { Feather } from "react-native-vector-icons"
import { emptyCard } from "../../../Mocks/emptyList"
import { formatCurrency } from "../../../Services/formatCurrency"
import { ReservaContext } from "../../../Context/reservaContext"

const { fonteNegrito, corPrimaria } = theme

export default function ModalPagamento({ 
    abreModalAddCard, 
    openModalSelecionarPgto, 
    setModalEstendeHora,
    setModalPagamento,
    setModalConfirma
}) {

    const { 
        valorPreSelecionado,
        setItemPreSelecionado,
        itemPreSelecionado
    } = useContext(ReservaContext)

    let reserva = valorPreSelecionado * 0.95
    let taxaAdicional = (reserva * 0.1) + 0.06
    let total = reserva + taxaAdicional

    function pagamentoConfirmado() {
        setItemPreSelecionado({ ...itemPreSelecionado, value: total })
        setModalPagamento(false)
        setModalConfirma(true)
    }

    return (
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
                <Text style={estilos.avisoCartao}>
                    { emptyCard }
                </Text>
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
                <View style={{alignItems: 'center', width: '100%'}} >
                    <Botao 
                        children={"Confirmar"}
                        corDeFundo={corPrimaria}
                        largura={'85%'}
                        corDoTexto={"#fff"}
                        negrito
                        aoPressionar={pagamentoConfirmado}
                    />
                </View>
            </View>
        </View>
    )
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