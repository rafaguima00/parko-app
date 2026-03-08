import { Text, View, Image, StyleSheet } from "react-native"
import React from "react"
import { theme } from "../../../../Theme"
import { Botao } from "../../../../Components/Botao"
import api from "../../../../Services/api"

const { fonteNegrito, corPrimaria } = theme

const FinalizarReserva = (props) => {

    const { setModalFinalizarReserva, setModalAguardar } = props.states
    const { findReservation } = props

    function denyExit() {
        setModalFinalizarReserva(false)
    }

    async function confirm() {
        await api.post("/request_end", {
            id_customer: findReservation.id_costumer,
            id_reservation: findReservation.id,
            id_establishment: findReservation.id_establishment,
            id_vehicle: findReservation.id_vehicle
        })
        .then(() => {
            setModalFinalizarReserva(false)
            setModalAguardar(true)
        })
        .catch(e => {
            Alert.alert("Erro. Tente novamente", e)
        })
    }

    return <>
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <Image source={require('../../../../../assets/checked.png')} />
                    <Text style={estilos.tituloConfirmacao} >Confirmação</Text>
                    <Text style={estilos.mensagemConfirmacao}>
                        Você confirma que já está de saída do estacionamento?
                    </Text>
                </View>
                <View style={{alignItems: 'center', gap: 12}} >
                    <Botao 
                        children={"Confirmar"}
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={confirm}
                    />
                    <Botao 
                        children={"Negar"}
                        corDeFundo={'#ff4a4a'}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={denyExit}
                    />
                </View>
            </View>
        </View>
    </>
}

const estilos = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(84, 84, 84, 0.25)'
    },
    modalContent: {
        gap: 20
    },
    confirmacao: {
        justifyContent:'center', 
        alignItems: 'center', 
        width: 300, 
        height: 240, 
        backgroundColor: 'white',
        borderRadius: 25
    },
    tituloConfirmacao: {
        fontSize: 24,
        fontFamily: fonteNegrito,
        lineHeight: 26,
        paddingTop: 15,
        color: '#523499'
    },
    mensagemConfirmacao: {
        textAlign: 'center', 
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: '#545454',
        lineHeight: 18,
        padding: 18
    }
})

export default FinalizarReserva