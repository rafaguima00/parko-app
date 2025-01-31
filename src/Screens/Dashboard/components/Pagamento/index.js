import React, { useContext, useEffect, useState } from "react"
import { FlatList, View, Text, TouchableOpacity, Modal } from "react-native"
import { Botao } from "../../../../Components/Botao"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior, FundoCinza, Taxas, LeftText, RightText } from "../../style"
import { theme } from "../../../../Theme"
import { emptyCard } from "../../../../Mocks/emptyList"
import { formatCurrency } from "../../../../Services/formatCurrency"
import { Feather } from "react-native-vector-icons"
import { ReservaContext } from "../../../../Context/reservaContext"
import { usePayment } from "../../../../Context/paymentContext"
import CardList from "../../../../Components/CardList"
import { useUser } from "../../../../Context/dataUserContext"
import axios from "axios"
import { ACCESS_TOKEN } from "@env"
import LoadingModal from "../../../../Components/Loading"
import InsertCvv from "../Modal/InsertCvv"

const { corPrimaria } = theme

const Pagamento = (props) => {

    const { setPagamento, setSelecionarPgto, setAddCartao, setModalConfirma } = props.states
    const { voltar } = props

    const { 
        itemPreSelecionado, 
        setItemPreSelecionado,
        valorPreSelecionado
    } = useContext(ReservaContext)
    const { card, setCard, cartaoSelecionado } = usePayment()
    const { dataUser } = useUser()

    const [loading, setLoading] = useState(true)
    const [modalCvv, setModalCvv] = useState(false)

    let reserva = valorPreSelecionado * 0.95
    let taxaAdicional = (reserva * 0.1) + 0.06
    let total = reserva + taxaAdicional

    function confirmarPgto() {
        setModalCvv(true)
    }

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
        return <>
            <View>
                <Text style={styles.veiculosVazio}>
                    {emptyCard}
                </Text>
            </View>
        </>
    }

    useEffect(() => {
        getCostumerCard(dataUser.email)
    }, [])

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
                horizontal={card.length > 0 ? true : false}
                data={card}
                renderItem={item => <CardList {...item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                showsHorizontalScrollIndicator={false}
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
            <View style={{ alignItems: "center", justifyContent: "center" }}>
                <Botao
                    children={"Confirmar"}
                    corDeFundo={cartaoSelecionado ? corPrimaria : "rgba(125, 125, 125, 0.4)"}
                    largura={"100%"}
                    corDoTexto={"#fff"}
                    negrito
                    aoPressionar={confirmarPgto}
                    opacidade={0.7}
                    disabled={cartaoSelecionado ? false : true}
                />
            </View>
        </View>
        <Modal
            visible={modalCvv}
            animationType="fade"
            onRequestClose={() => {}}
            transparent
        >
            <InsertCvv 
                states={{ setModalCvv }} 
                setPagamento={setPagamento}
                setModalConfirma={setModalConfirma}
                total={total}
            />
        </Modal>
        <LoadingModal loading={loading} />
    </>
}

export default Pagamento