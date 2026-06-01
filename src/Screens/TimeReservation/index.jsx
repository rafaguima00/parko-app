import { useState, useEffect, useRef, useMemo } from "react"
import {
    View,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    ScrollView,
    Platform
} from 'react-native'
import { Feather } from 'react-native-vector-icons'
import EstenderHorario from "./Modal/estenderHorario"
import ModalPagamento from "./Modal/pagamento"
import AddCard from "./Modal/addCard"
import SelecionarPgto from "./Modal/selecionarPgto"
import ModalConfirmacao from "./Modal/confirmacao"
import ModalMsgConfirmacao from "./Modal/msgConfirmacao"
import { Botao } from "../../Components/Botao"
import { useReservation } from "../../Context/reservaContext"
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
    const [intervalo, setIntervalo] = useState(true)
    const [tempo, setTempo] = useState("00:00:00")

    const codigoGeradoRef = useRef(false)
    const timerRef = useState(null)

    const { loadReservations, loadTabelaFixa } = ReadApi()
    const { dataUser } = useUser()
    const { 
        setReservaFeita, 
        reservations,
        setCode,
        code,
        setExpiresAt,
        expiresAt
    } = useReservation()

    const { idDestination, idReservation } = route?.params ?? {}

    const reservation = useMemo(() => {
        return reservations.find(item =>
            item.id_costumer == dataUser.id &&
            ["Confirmado", "Recusado", "Finalizado"].includes(item.status) &&
            item.id == idReservation
        )
    }, [reservations, dataUser.id, idReservation])

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

    function filterRequest(data) {
        const request = data.filter(item => item.id_reservation == idReservation)
        
        if (request.length > 0) {
            setModalNovaFinalizacao(true)
            return
        }

        setIntervalo(true)
        setModalFinalizarReserva(true)
    }

    async function botaoFinalizar() {
        if (!reservation) return

        await api.get(`/request_end/${reservation?.id_establishment}`)
            .then(res => {
                console.log(res.data)
                filterRequest(res.data)
            })
            .catch(e => {
                console.log(e)
            })
    }

    function filterReservation(data) {
        const reservation = data.map(item => item.status_reservation)

        if (reservation[0] == 3) {
            verificarReservaRecusada()
            return
        }

        if (reservation[0] == 4) {
            setCode([])
            setIntervalo(false)
            setTempo("00:00:00")
            //setReservaFeita(false)
            setModalSaidaAprovada(true)
            return
        }
    }

    async function getReservations() {
        await api.get(`/reservations/${idReservation}`)
        .then(res => {
            filterReservation(res.data)
        })
        .catch(e => {
            console.log(e)
        })
    }

    async function estenderTempo(novaReserva) {

        const { data_saida, hora_saida, value } = novaReserva

        await api.put(`/reservations/${idReservation}`, {
            data_entrada: reservation.data_entrada,
            hora_entrada: reservation.hora_entrada,
            data_saida: data_saida,
            hora_saida: hora_saida,
            value: reservation.value + value,
            status: 2,
            id_vehicle: reservation.id_vehicle
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
        if (!reservation) {
            //setReservaFeita(false)
            setTempo("00:00:00")
            return
        }

        if (reservation?.status === "Finalizado") {
            setCode([])
            setIntervalo(false)
            setTempo("00:00:00")
            //setReservaFeita(false)
            setModalSaidaAprovada(true)
            return
        }

        let dataSaidaDoCliente = reservation?.data_saida ?? ""
        const [day, month, year] = dataSaidaDoCliente.split('/')

        let converterData = `${year}-${month}-${day}`

        let horaSaidaDoCliente = reservation?.hora_saida ?? ""
        let converterHora = new Date(converterData+" "+horaSaidaDoCliente).getTime()

        if (!dataSaidaDoCliente || !horaSaidaDoCliente) return

        const tempoAtual = new Date().getTime()
        const diferenca = converterHora - tempoAtual

        // if (diferenca <= 0) {
        //      setReservaFeita(false)
        //     return navigation.replace('Map')
        // }

        // // Verificar se a diferença é válida
        // if (isNaN(diferenca)) return

        // if  (tempoAtual > converterHora) {
        //     setReservaFeita(false)
        //     setTempo("00:00:00")
        //     return
        // }

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
        if (codigoGeradoRef.current || code.length > 0 || new Date().getTime() < new Date(expiresAt).getTime()) {
            return
        }
    
        codigoGeradoRef.current = true
    
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

    useEffect(() => {
        codigoGeradoRef.current = false
    }, [])

    useEffect(() => {
        if (!dataUser?.id) return

        loadReservations(dataUser?.id)
        if (idDestination) {
            loadTabelaFixa(idDestination)
        }
    }, [dataUser?.id, idDestination])

    useEffect(() => {
        if (!reservation) return

        converter()

        const interval = setInterval(converter, 1000)

        return () => clearInterval(interval)
    }, [reservation])

    useEffect(() => {
        if (!intervalo || !idReservation) return

        const interval = setInterval(getReservations, 1500)

        return () => clearInterval(interval)
    }, [intervalo, idReservation])

    return (

        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.areaContent}>
                    <TouchableOpacity
                        style={styles.goBack}
                        onPress={() => navigation.goBack()}>
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
                            children={"Finalizar reserva"}
                            estilo={styles.btFinalizarReserva}
                            corDoTexto={"#fff"}
                            negrito
                            aoPressionar={botaoFinalizar}
                        />
                        <Botao
                            children={"Estender tempo"}
                            corDeFundo={"#f4f4f4"}
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
                            findReservation={reservation}
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
                            findReservation={reservation}
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
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default TempoEspera