import React, { useEffect, useContext } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { theme } from "../../../../../Theme"
import { ReservaContext } from "../../../../../Context/reservaContext" 
import { MsgConfirmacao } from "../style"

const { fonteNegrito } = theme

function ModalMsgConfirmacao({ modalAtivo, handleClose }) {

    const { novaReserva } = useContext(ReservaContext)

    const navigation = useNavigation()
    
    const mensagemFinal = () => {
        return <>
            <MsgConfirmacao>
                1 Vaga reservada para você!{'\n'}
                Sua reserva possui previsão de início em{' '}
                <MsgConfirmacao negrito>
                    {novaReserva.data_entrada}, {novaReserva.hora_entrada}
                </MsgConfirmacao>{' '}
                e de término em{' '}
                <MsgConfirmacao negrito>
                    {novaReserva.data_saida}, {novaReserva.hora_saida}
                </MsgConfirmacao>.
            </MsgConfirmacao>
        </>
    }

    const textMessage = mensagemFinal()

    useEffect(() => {
        if(modalAtivo) {
            const timer = setTimeout(() => {
                handleClose()
                navigation.navigate('Mapa Principal')
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [modalAtivo])

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <View style={estilos.viewCheck} >
                        <Feather name="check" size={42} color='#f4f4f4' />
                    </View>
                    <Text style={estilos.tituloConfirmacao}>Sucesso!</Text>
                    {textMessage}
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(84, 84, 84, 0.25)'
    },
    modalContent: {
        gap: 16
    },
    confirmacao: {
        justifyContent:'center', 
        alignItems: 'center', 
        width: 320, 
        height: 280, 
        backgroundColor: 'white',
        borderRadius: 25
    },
    viewCheck: {
        width: 80, 
        height: 80, 
        backgroundColor: "#509C76", 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 50
    },
    tituloConfirmacao: {
        fontSize: 24,
        fontFamily: fonteNegrito,
        lineHeight: 25,
        paddingTop: 12,
        color: '#523499'
    }
}) 

export default ModalMsgConfirmacao