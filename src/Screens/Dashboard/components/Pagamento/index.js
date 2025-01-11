import React, { useContext, useEffect, useState } from "react"
import { FlatList, View, Text, TouchableOpacity } from "react-native"
import { Botao } from "../../../../Components/Botao"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior, FundoCinza, Taxas, LeftText, RightText } from "../../style"
import { theme } from "../../../../Theme"
import { emptyCard } from "../../../../Mocks/emptyList"
import { formatCurrency } from "../../../../Services/formatCurrency"
import { Feather } from "react-native-vector-icons"
import { ReservaContext } from "../../../../Context/reservaContext"

const { corPrimaria } = theme

const Pagamento = (props) => {

    const { setPagamento, setSelecionarPgto, setAddCartao, setModalConfirma } = props.states
    const { voltar } = props

    const { 
        itemPreSelecionado, 
        setItemPreSelecionado,
        valorPreSelecionado
    } = useContext(ReservaContext)

    const [cartaoDeCredito, setCartaoDeCredito] = useState([])

    let reserva = valorPreSelecionado * 0.95
    let taxaAdicional = (reserva * 0.1) + 0.06
    let total = reserva + taxaAdicional

    function confirmarPgto() {
        setItemPreSelecionado({ ...itemPreSelecionado, value: total })
        setPagamento(false)
        setModalConfirma(true)
    }

    const renderItem = ({ item }) => {
        return <>
        </>
    }

    const EmptyListMessage = () => {
        return <>
            <View>
                <Text style={styles.veiculosVazio}>
                    {emptyCard}
                </Text>
            </View>
        </>
    }

    return <>
        <View style={[styles.dashContent, styles.escolher]} >
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Pagamento</TituloPrincipal>
            </TopModal>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.txtSelecioneCartao} >Selecione seu cartão de crédito</Text>
                <TouchableOpacity>
                    <Text 
                        style={styles.botaoMais} 
                        onPress={() => {
                            setPagamento(false)
                            setAddCartao(true)
                        }}>
                            +
                        </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                style={{ marginTop: 10, marginBottom: 46, paddingTop: 10 }}
                horizontal={cartaoDeCredito.length > 0 ? true : false}
                data={cartaoDeCredito}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
            />
            <View style={{ justifyContent: 'center' }} >
                <TouchableOpacity onPress={() => {
                    setPagamento(false)
                    setSelecionarPgto(true)
                }}>
                    <Text style={styles.escolherFormaPgto}>Escolher outra forma de pagamento</Text>
                </TouchableOpacity>
            </View>
            <Taxas>
                <View style={styles.itemTotal}>
                    <LeftText>TOTAL</LeftText>
                    <RightText>
                        {formatCurrency(total)}
                    </RightText>
                </View>
                <FundoCinza>
                    <LeftText>Reserva</LeftText>
                    <RightText>{formatCurrency(reserva)}</RightText>
                </FundoCinza>
                <FundoCinza>
                    <LeftText>Taxa Adicional</LeftText>
                    <RightText>{formatCurrency(taxaAdicional)}</RightText>
                </FundoCinza>
            </Taxas>
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                <Botao
                    children={"Confirmar"}
                    corDeFundo={corPrimaria}
                    largura={'100%'}
                    corDoTexto={'#fff'}
                    negrito
                    aoPressionar={confirmarPgto}
                    opacidade={0.7}
                />
            </View>
        </View>
    </>
}

export default Pagamento