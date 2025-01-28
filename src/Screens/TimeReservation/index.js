import React, { useState, useEffect, useContext } from "react"
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    ScrollView
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import EstenderHorario from "./Modal/estenderHorario"
import ModalPagamento from "./Modal/pagamento"
import AddCard from "./Modal/addCard"
import SelecionarPgto from "./Modal/selecionarPgto"
import ModalConfirmacao from "./Modal/confirmacao"
import ModalMsgConfirmacao from "./Modal/msgConfirmacao"
import { Botao } from "../../Components/Botao"
import { ReservaContext } from "../../Context/reservaContext"
import { 
    Clock, 
    ConfirmationCode, 
    styles, 
    Tempo, 
    Top,
    MensagemConfirmacao,
    AlignText,
    AlignItems,
    ViewNumero,
    Number
} from "./style"
import api from "../../Services/api"
import ReadApi from "../../Services/readData"
import { useUser } from "../../Context/dataUserContext"
import { Platform } from "react-native"
import FinalizarReserva from "./Modal/FinalizarReserva"
import ModalAguardar from "./Modal/Aguardar"
import SaidaPendente from "./Modal/SaidaPendente"
import SaidaAprovada from "./Modal/SaidaAprovada"
import ModalAguardarNovaFinalizacao from "./Modal/AguardarNovaFinalizacao"

function TempoEspera({ navigation, route }) {

    const [modalEstendeHora, setModalEstendeHora] = useState(false)
    const [modalPagamento, setModalPagamento] = useState(false)
    const [modalAddCartao, setModalAddCartao] = useState(false)
    const [modalSelecionarPgto, setModalSelecionarPgto] = useState(false)
    const [modalConfirma, setModalConfirma] = useState(false)
    const [modalMsgConfirma, setModalMsgConfirma] = useState(false)
    const [modalFinalizarReserva, setModalFinalizarReserva] = useState(false)
    const [modalAguardar, setModalAguardar] = useState(false)
    const [modalSaidaPendente, setModalSaidaPendente] = useState(false)
    const [modalSaidaAprovada, setModalSaidaAprovada] = useState(false)
    const [modalNovaFinalizacao, setModalNovaFinalizacao] = useState(false)
    const [tempo, setTempo] = useState("00:00:00")

    const { loadReservations, loadTabelaFixa } = ReadApi()
    const { dataUser } = useUser()
    const { 
        setReservaFeita, 
        reservations,
        setCode,
        code,
        setExpiresAt,
        expiresAt
    } = useContext(ReservaContext)

    const { idDestination, idReservation } = route?.params

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser.id && 
        (item.status == "Confirmado" || item.status == "Recusado" || item.status == "Finalizado") && 
        item.id == idReservation
    )

    const abreModalEstendeHora = () => {
        setModalEstendeHora(true)
    }

    const abreModalPagamento = () => {
        setModalSelecionarPgto(false)
        setModalAddCartao(false)
        setModalEstendeHora(false)
        setModalPagamento(true)
    }

    const closeMsgConfirmacao = () => {
        setModalMsgConfirma(false)
    }

    const openModalAddCartao = () => {
        setModalPagamento(false)
        setModalAddCartao(true)
    }

    const openModalSelecionarPgto = () => {
        setModalPagamento(false)
        setModalSelecionarPgto(true)
    }

    function botaoFinalizar() {
        if(new Date().getTime() < new Date(expiresAt).getTime()) {
            setModalNovaFinalizacao(true)
            return
        }

        setModalFinalizarReserva(true)
    }

    async function estenderTempo(novaReserva) {

        const { data_saida, hora_saida, value } = novaReserva

        await api.put(`/reservations/${idReservation}`, {
            data_entrada: findReservation[0].data_entrada,
            hora_entrada: findReservation[0].hora_entrada,
            data_saida: data_saida,
            hora_saida: hora_saida,
            value: findReservation[0].value + value,
            status: 2,
            id_vehicle: findReservation[0].id_vehicle
        })
        .then(() => {
            setModalConfirma(false)
            setModalMsgConfirma(true)
            alert("Reserva atualizada com sucesso")
        })
        .catch(e => {
            alert(`Erro ao atualizar reserva: ${e}`)
        })
    }

    function converter() {
        if(!findReservation[0]) {
            setTempo("00:00:00")
            return
        }

        if(findReservation[0]?.status === "Finalizado") {
            setTempo("00:00:00")
            setModalSaidaAprovada(true)
            return
        }

        let dataSaidaDoCliente = findReservation[0]?.data_saida ?? ""
        const [day, month, year] = dataSaidaDoCliente.split('/')

        // Retorna a data no formato YYYY-MM-DD
        let converterData = `${year}-${month}-${day}`

        let horaSaidaDoCliente = findReservation[0]?.hora_saida ?? ""
        let converterHora = new Date(converterData+" "+horaSaidaDoCliente).getTime()

        // Verificar se as informações de data e hora estão presentes
        if (!dataSaidaDoCliente || !horaSaidaDoCliente) return

        const tempoAtual = new Date().getTime()
        const diferenca = converterHora - tempoAtual

        if(diferenca <= 0) {
            setReservaFeita(false)
            return navigation.replace('Map')
        }

        // Verificar se a diferença é válida
        if (isNaN(diferenca)) return

        if(tempoAtual > converterHora) {
            setTempo("00:00:00")
            return
        }

        let horas = Math.floor(diferenca / (1000 * 60 * 60))
        let minutos = Math.floor((diferenca % (1000 * 60 * 60)) / (1000 * 60))
        let segundos = Math.floor((diferenca % (1000 * 60)) / 1000)
        
        let form = (horas < 10 ? "0"+horas : horas) + 
            ":" + 
            (minutos < 10 ? "0"+minutos : minutos) + 
            ":" + 
            (segundos < 10 ? "0"+segundos : segundos)

        setTempo(form)
    }

    function codigoDeConfirmacao() {
        return <>
            <MensagemConfirmacao>
                Houve um problema na confirmação,{' '}
                <MensagemConfirmacao negrito>
                    você deverá apresentar esse código{' '}
                </MensagemConfirmacao>
                para validar a sua saída do estacionamento
            </MensagemConfirmacao>
        </>
    }

    async function verificarReservaRecusada() {
        if(code.length > 0 || new Date().getTime() < new Date(expiresAt).getTime()) {
            return null
        }

        if(findReservation[0]?.status === "Recusado") {
            await api.post("/generate-code", {
                id_reservation: idReservation
            })
            .then(res => {
                setModalSaidaPendente(true)

                const dataGenerated = res.data[0]
                setCode(dataGenerated.code.toString().split(""))
                setExpiresAt(dataGenerated.expires_at)
            })
            .catch(() => {
                console.log("Erro ao gerar código")
            })
        }

        if(findReservation[0]?.status === "Finalizado") {
            setModalSaidaAprovada(true)
        }
    }

    useEffect(() => {
        if(findReservation[0]) {
            verificarReservaRecusada()
        }
    }, [findReservation[0]])

    useEffect(() => {
        loadReservations()
        loadTabelaFixa(idDestination)
    }, [dataUser.id])

    useEffect(() => {
        let intervalo

        if(findReservation[0]) {
            converter()
            intervalo = setInterval(converter, 1000)

            return () => clearInterval(intervalo)
        }
    }, [reservations])

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <SafeAreaView style={styles.areaContent}>
                    <TouchableOpacity
                        style={styles.goBack}
                        onPress={() => navigation.replace('Map')}>
                        <Feather name="arrow-left" size={32} color="#fff" />
                    </TouchableOpacity>
                    <View>
                        <Clock>
                            <Tempo>{tempo}</Tempo>
                        </Clock>
                    </View>
                    {code.length > 0 && <ConfirmationCode>
                        <Top>Código de Confirmação</Top>
                        <AlignItems>
                            {code?.map((item, index) => (
                                <ViewNumero key={index}>
                                    <Number>{item}</Number>
                                </ViewNumero>
                            ))}
                        </AlignItems>
                        <AlignText>{codigoDeConfirmacao()}</AlignText>
                    </ConfirmationCode>}
                    <View style={styles.buttonContainer}>
                        <Botao
                            children={'Finalizar reserva'}
                            estilo={styles.btFinalizarReserva}
                            corDoTexto={'#fff'}
                            negrito
                            aoPressionar={botaoFinalizar}
                        />
                        <Botao
                            children={'Estender tempo'}
                            corDeFundo={'#f4f4f4'}
                            corDoTexto={"#7d7d7d"}
                            negrito
                            aoPressionar={abreModalEstendeHora}
                        />
                    </View>

                    {/* Sequência de modais da tela */}
                    <Modal
                        visible={modalEstendeHora}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="slide"
                    >
                        <EstenderHorario
                            idDestination={idDestination}
                            abreModalPagamento={abreModalPagamento} 
                            setModalEstendeHora={setModalEstendeHora}
                            setModalPagamento={setModalPagamento}
                        />
                    </Modal>

                    <Modal
                        visible={modalPagamento}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="fade"
                    >
                        <ModalPagamento
                            setModalEstendeHora={setModalEstendeHora}
                            setModalPagamento={setModalPagamento}
                            setModalConfirma={setModalConfirma}
                            abreModalAddCard={openModalAddCartao}
                            openModalSelecionarPgto={openModalSelecionarPgto}
                        />
                    </Modal>

                    <Modal
                        visible={modalAddCartao}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="fade"
                    >
                        <AddCard 
                            openModalPagamento={abreModalPagamento}
                            setModalAddCartao={setModalAddCartao}
                        />
                    </Modal>

                    <Modal
                        visible={modalSelecionarPgto}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="fade"
                    >
                        <SelecionarPgto 
                            openModalPagamento={abreModalPagamento} 
                            setModalSelecionarPgto={setModalSelecionarPgto}
                            setModalPagamento={setModalPagamento}
                        />
                    </Modal>

                    <Modal
                        visible={modalConfirma}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="fade"
                    >
                        <ModalConfirmacao
                            handleClose={() => setModalConfirma(false)}
                            estenderTempo={estenderTempo}
                            findReservation={findReservation}
                        />
                    </Modal>

                    <Modal
                        visible={modalMsgConfirma}
                        transparent={true}
                        onRequestClose={() => { }}
                        animationType="fade"
                    >
                        <ModalMsgConfirmacao modalAtivo={modalMsgConfirma} handleClose={closeMsgConfirmacao} />
                    </Modal>

                    <Modal
                        visible={modalFinalizarReserva}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <FinalizarReserva  
                            states={{
                                setModalFinalizarReserva,
                                setModalAguardar
                            }}
                        />
                    </Modal>

                    <Modal
                        visible={modalAguardar}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <ModalAguardar 
                            states={{ 
                                modalAguardar,
                                setModalAguardar
                            }} 
                        />
                    </Modal>

                    <Modal
                        visible={modalNovaFinalizacao}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <ModalAguardarNovaFinalizacao 
                            states={{
                                modalNovaFinalizacao,
                                setModalNovaFinalizacao
                            }}
                        />
                    </Modal>

                    <Modal
                        visible={modalSaidaPendente}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <SaidaPendente 
                            states={{
                                modalSaidaPendente,
                                setModalSaidaPendente
                            }}
                        />
                    </Modal>

                    <Modal
                        visible={modalSaidaAprovada}
                        transparent={true}
                        onRequestClose={() => {}}
                        animationType="fade"
                    >
                        <SaidaAprovada 
                            states={{
                                modalSaidaAprovada, 
                                setModalSaidaAprovada
                            }}
                        />
                    </Modal>

                </SafeAreaView>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default TempoEspera