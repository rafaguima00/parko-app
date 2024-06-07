import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    View,
    TouchableOpacity,
    Alert,
    Modal
} from 'react-native'
import { Ionicons, Feather } from 'react-native-vector-icons';
import EstenderHorario from "./Modal/estenderHorario";
import ModalPagamento from "./Modal/pagamento";
import AddCard from "./Modal/addCard";
import SelecionarPgto from "./Modal/selecionarPgto";
import ModalConfirmacao from "./Modal/confirmacao";
import ModalMsgConfirmacao from "./Modal/msgConfirmacao";
import CountDownTimer from "react-native-countdown-timer-hooks";
import { Botao } from "../../Components/Botao"
import { ReservaContext } from "../../Context/reservaContext";
import { styles } from "./style";
import api from "../../Services/api";
import ReadApi from "../../Services/readData";
import { useUser } from "../../Context/dataUserContext";

function TempoEspera({ navigation }) {

    const [modalEstendeHora, setModalEstendeHora] = useState(false)
    const [modalPagamento, setModalPagamento] = useState(false)
    const [modalAddCartao, setModalAddCartao] = useState(false)
    const [modalSelecionarPgto, setModalSelecionarPgto] = useState(false)
    const [modalConfirma, setModalConfirma] = useState(false)
    const [modalMsgConfirma, setModalMsgConfirma] = useState(false)

    const { loadReservations } = ReadApi()
    const { dataUser } = useUser()

    const { 
        setReservaFeita, 
        tempoTotal, 
        setTempoTotal, 
        setRunning,
        setDestination,
        reservations
    } = useContext(ReservaContext)

    useEffect(() => {
        loadReservations()
    }, [])

    useEffect(() => {
        console.log(findReservation[0])
    }, [reservations])

    const abreModalEstendeHora = () => {
        setModalEstendeHora(true)
    }

    const abreModalPagamento = () => {
        setModalSelecionarPgto(false)
        setModalAddCartao(false)
        setModalEstendeHora(false)
        setModalPagamento(true)
    }

    const pagamentoConfirmado = () => {
        setModalPagamento(false)
        setModalConfirma(true)
    }

    const mensagemConfirmacao = () => {
        setModalConfirma(false)
        setModalMsgConfirma(true)
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

    const findReservation = reservations.filter(
        item => item.id_costumer == dataUser.id && 
        (item.status == "Pendente" || item.status == "Confirmado")
    )

    const cancelaReserva = async (id) => {
        await api.put(`/reservations/${id}`, {
            data_entrada: findReservation[0].data_entrada,
            hora_entrada: findReservation[0].hora_entrada,
            data_saida: findReservation[0].data_saida,
            hora_saida: findReservation[0].hora_saida,
            value: findReservation[0].value,
            status: 4,
            id_vehicle: findReservation[0].id_vehicle
        })
        .then(() => {
            navigation.navigate('Map')
            Alert.alert(
                "Aviso",
                "Sua reserva foi finalizada"
            )
            setRunning(false)
            setTempoTotal(0)
            setReservaFeita(false)
            setDestination(false)
        })
        .catch(e => {
            Alert.alert(
                "Aviso",
                "Erro ao finalizar reserva"
            )
            console.log(e)
        })
    }

    function handleFinish() {
        alert('Tempo de reserva esgotado!')
        setRunning(false)
    }

    return (

        <SafeAreaView style={styles.areaContent}>
            <TouchableOpacity
                style={styles.goBack}
                onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={32} color="#fff" />
            </TouchableOpacity>

            {/* <TouchableOpacity
                style={styles.iconHome}
                onPress={() => navigation.navigate('Map')}>
                <Ionicons name="home-sharp" size={22} />
            </TouchableOpacity> */}

            <CountDownTimer
                timestamp={tempoTotal}
                containerStyle={{
                    height: 320,
                    width: 320,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 160,
                    backgroundColor: '#0D9CBC',
                    borderColor: '#fff',
                    borderWidth: 5
                }}
                textStyle={{
                    fontSize: 54,
                    color: '#FFF',
                    fontWeight: '700',
                    letterSpacing: 4
                }}
            />

            <View style={styles.buttonContainer}>
                <Botao
                    children={'Finalizar reserva'}
                    estilo={styles.btFinalizarReserva}
                    corDoTexto={'#fff'}
                    negrito
                    aoPressionar={() => {
                        Alert.alert(
                            "Finalizar reserva",
                            "Tem certeza que deseja finalizar a reserva?",
                            [
                                {
                                    text: "OK",
                                    onPress: () => cancelaReserva(findReservation[0].id)
                                },
                                {
                                    text: "Cancelar"
                                }
                            ]
                        )
                    }}
                />
                <Botao
                    children={'Estender tempo'}
                    corDeFundo={'#f4f4f4'}
                    corDoTexto={"#7d7d7d"}
                    negrito
                    aoPressionar={abreModalEstendeHora}
                />
            </View>

            <Modal
                visible={modalEstendeHora}
                transparent={true}
                onRequestClose={() => { }}
                animationType="slide"
            >
                <EstenderHorario abreModalPagamento={abreModalPagamento} />
            </Modal>

            <Modal
                visible={modalPagamento}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <ModalPagamento
                    abreModalAddCard={openModalAddCartao}
                    openModalSelecionarPgto={openModalSelecionarPgto}
                    pagamentoConfirmado={pagamentoConfirmado}
                />
            </Modal>

            <Modal
                visible={modalAddCartao}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >

                <AddCard openModalPagamento={abreModalPagamento} />
            </Modal>

            <Modal
                visible={modalSelecionarPgto}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <SelecionarPgto openModalPagamento={abreModalPagamento} />
            </Modal>

            <Modal
                visible={modalConfirma}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <ModalConfirmacao
                    handleClose={() => setModalConfirma(false)}
                    mensagemConfirmacao={mensagemConfirmacao}
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

        </SafeAreaView>
    )
}

export default TempoEspera;