import React, { useState, useEffect, useContext } from "react"
import { Modal, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native'
import Topo from "./components/Top"
import { AreaView } from "./style"
import ModalConfirmacao from "./components/Modal/Confirmacao"
import ModalMsgConfirmacao from "./components/Modal/MensagemConfirmacao"
import DatePickerModal from "./components/Modal/DatePicker"
import { ReservaContext } from "../../Context/reservaContext"
import { useUser } from "../../Context/dataUserContext"
import Menu from "./components/Menu"
import ReadApi from "../../Services/readData"
import api from "../../Services/api"
import EscolherVeiculo from "./components/EscolherVeiculo"
import CadastrarVeiculo from "./components/CadastrarVeiculo"
import Pagamento from "./components/Pagamento"
import AdicionaCartao from "./components/AdicionaCartao"
import EscolherPgto from "./components/EscolherPgto"
import MaisTempo from "./components/Modal/MaisTempo"
import { usePayment } from "../../Context/paymentContext"

function Dashboard({ navigation }) {
    
    const { tokenCard, cartaoSelecionado, setTokenCard, setCartaoSelecionado } = usePayment()
    const { veiculos, dataUser } = useUser()
    const { loadVehicles } = ReadApi()
    const { destination, novaReserva, setNovaReserva } = useContext(ReservaContext)

    const [informacoes, setInformacoes] = useState(true)
    const [escolherVeiculo, setEscolherVeiculo] = useState(false)
    const [cadastrarVeiculo, setCadastrarVeiculo] = useState(false)
    const [pagamento, setPagamento] = useState(false)
    const [addCartao, setAddCartao] = useState(false)
    const [selecionarPgto, setSelecionarPgto] = useState(false)
    const [modalConfirma, setModalConfirma] = useState(false)
    const [modalMsgConfirma, setModalMsgConfirma] = useState(false)
    const [modalDatePicker, setModalDatePicker] = useState(false)
    const [modalMaisTempo, setModalMaisTempo] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [loading, setLoading] = useState(false)

    // Requisição para processar o pagamento
    async function pagamentoReserva() {
        setLoading(true)
    
        try {
            const response = await api.post("/create_payment", {
                token: tokenCard,
                transaction_amount: novaReserva.value,
                customer_id: cartaoSelecionado.customer_id,
                description: `Parking: ${destination.name}`,
                payment_method_id: cartaoSelecionado.payment_method.id,
                issuer_id: cartaoSelecionado.issuer.id
            })
    
            const id_payment = response.data.id
            const card_brand = response.data.payment_method_id
            const status = response.data.status
            const payment_method = response.data.payment_type_id
    
            if (status === "approved") {
                confirmaReserva(id_payment, card_brand, status, payment_method)
                setTokenCard("")
                setCartaoSelecionado(null)
                return
            } 
            
            if (status === "rejected") {
                Alert.alert(
                    "Pagamento Rejeitado",
                    "O pagamento foi rejeitado. Por favor, verifique seu cartão ou tente novamente."
                )
                setTokenCard("")
                setCartaoSelecionado(null)
                setPagamento(true)
                setModalConfirma(false)
                setLoading(false)
                return
            } 
            
            Alert.alert(
                "Pagamento Pendente",
                "Seu pagamento está em análise. Você será notificado assim que for aprovado."
            )
            setTokenCard("")
            setLoading(false)
            
    
        } catch (e) {
            const errorMessage = e.response?.data?.error.message || "Erro inesperado. Tente novamente mais tarde."
            Alert.alert("Erro ao realizar pagamento", errorMessage)
            setModalConfirma(false)
            setInformacoes(true)
            setNovaReserva({})
            setTokenCard("")
        } finally {
            setLoading(false)
            setCartaoSelecionado(null)
        }
    }
    
    // Função para salvar a reserva e o estado dela na base de dados
    async function confirmaReserva(id_payment, card_brand, status, payment_method) {

        await api.post("/reservations", {
            data_entrada: novaReserva.data_entrada, 
            hora_entrada: novaReserva.hora_entrada, 
            data_saida: novaReserva.data_saida,
            hora_saida: novaReserva.hora_saida,
            value: novaReserva.value,
            id_costumer: dataUser.id, 
            status_reservation: 1, 
            id_vehicle: novaReserva.id_vehicle, 
            id_establishment: destination.id,
            parko_app: 1 
        })
        .then(res => {
            salvarPgto(id_payment, card_brand, status, payment_method, res.data.id)
        })
        .catch(e => {
            Alert.alert("Erro ao realizar reserva", e)
            setModalMsgConfirma(false)
            setInformacoes(true)
            setNovaReserva({})
        })
        .finally(() => {
            setLoading(false)
        })
    }

    // Salvar os dados do pagamento na base de dados
    async function salvarPgto(id_payment, card_brand, status, payment_method, idReservation) {
        await api.post("/payment-on-db", [{ 
            id_customer: dataUser.id, 
            id_vehicle: novaReserva.id_vehicle, 
            id_establishment: destination.id, 
            value: novaReserva.value.toFixed(2), 
            payment_method: payment_method, 
            id_payment: id_payment,
            card_brand: card_brand,
            id_reservation: idReservation, 
            status: status,
            value_paid: novaReserva.value.toFixed(2),
            change_to_pay: 0,
            change_paid: 0
        }])
        .then(() => {
            setTokenCard("")
            setModalConfirma(false)
            setModalMsgConfirma(true)
        })
        .catch(e => {
            console.log("Erro ao salvar pagamento", e)
        })
    }
    
    useEffect(() => {
        loadVehicles(dataUser.id)
    }, [veiculos])

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                bounces={false}
                showsVerticalScrollIndicator={false}
            >
                <AreaView>

                    <Topo
                        handleImageLoaded={() => setImageLoaded(true)}
                        voltar={() => navigation.navigate('Map')}
                    />

                    {(imageLoaded && informacoes) &&
                        <Menu
                            setModalDatePicker={setModalDatePicker}
                            setInformacoes={setInformacoes}
                            setEscolherVeiculo={setEscolherVeiculo}
                            setModalMaisTempo={setModalMaisTempo}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    }

                    {escolherVeiculo &&
                        <EscolherVeiculo 
                            states={{
                                setEscolherVeiculo,
                                setPagamento,
                                setCadastrarVeiculo
                            }}
                            voltar={() => {
                                setEscolherVeiculo(false)
                                setInformacoes(true)
                            }}
                        />
                    }

                    {cadastrarVeiculo &&
                        <CadastrarVeiculo 
                            states={{
                                setEscolherVeiculo,
                                setCadastrarVeiculo
                            }}
                            voltar={() => {
                                setCadastrarVeiculo(false)
                                setEscolherVeiculo(true)
                            }}
                        />
                    }

                    {pagamento &&
                        <Pagamento 
                            states={{ 
                                setPagamento, 
                                setSelecionarPgto, 
                                setAddCartao, 
                                setModalConfirma 
                            }}
                            voltar={() => {
                                setPagamento(false)
                                setEscolherVeiculo(true)
                            }}
                        />
                    }

                    {addCartao &&
                        <AdicionaCartao 
                            states={{ 
                                setAddCartao,
                                setPagamento
                            }}
                            voltar={() => {
                                setAddCartao(false)
                                setPagamento(true)
                            }}
                        />
                    }

                    {selecionarPgto &&
                        <EscolherPgto 
                            states={{ 
                                setSelecionarPgto,
                                setAddCartao
                            }}
                            voltar={() => {
                                setSelecionarPgto(false)
                                setPagamento(true)
                            }}
                        />
                    }

                    <Modal
                        visible={modalMaisTempo}
                        animationType="fade"
                        onRequestClose={() => {}}
                        transparent={true}
                    >
                        <MaisTempo 
                            setModalMaisTempo={setModalMaisTempo} 
                            idDestination={destination?.id}
                        />
                    </Modal>

                    <Modal
                        visible={modalConfirma}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <ModalConfirmacao
                            handleClose={() => {
                                setModalConfirma(false)
                                setInformacoes(true)
                                setNovaReserva({})
                            }}
                            pagamentoReserva={pagamentoReserva}
                            loading={loading}
                            setLoading={setLoading}
                        />
                    </Modal>

                    <Modal
                        visible={modalMsgConfirma}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <ModalMsgConfirmacao
                            modalAtivo={modalMsgConfirma}
                            handleClose={() => {
                                setNovaReserva({})
                                setModalMsgConfirma(false)
                            }}
                        />
                    </Modal>

                    <Modal
                        visible={modalDatePicker}
                        transparent={true}
                        onRequestClose={() => setModalDatePicker(false)}
                        animationType="fade"
                    >
                        <DatePickerModal
                            setModalConfirma={() => {
                                setModalDatePicker(false)
                                setInformacoes(false)
                                setEscolherVeiculo(true)
                            }}
                            setModalDatePicker={setModalDatePicker}
                        />
                    </Modal>
                </AreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Dashboard