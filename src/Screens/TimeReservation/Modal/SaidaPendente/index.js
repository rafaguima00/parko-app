import React, { useEffect } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { theme } from "../../../../Theme"

const { fonteNegrito, corVermelha } = theme

export default function SaidaPendente(props) {

    const { modalSaidaPendente, setModalSaidaPendente } = props.states
    
    useEffect(() => {
        if(modalSaidaPendente) {
            const timer = setTimeout(() => {
                setModalSaidaPendente(false)
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [modalSaidaPendente])

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <View style={estilos.viewCheck} >
                        <Feather name="x" size={42} color='#f4f4f4' />
                    </View>
                    <Text style={estilos.tituloConfirmacao}>Saída Pendente</Text>
                    <Text style={estilos.mensagemConfirmacao}>Segundo o operador do estacionamento sua saída não está confirmada.</Text>
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
        gap: 20
    },
    confirmacao: {
        justifyContent:'center', 
        alignItems: 'center', 
        width: 290, 
        height: 220, 
        backgroundColor: 'white',
        borderRadius: 25
    },
    viewCheck: {
        width: 80, 
        height: 80, 
        backgroundColor: corVermelha, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 50
    },
    tituloConfirmacao: {
        fontSize: 24,
        fontFamily: fonteNegrito,
        lineHeight: 25,
        paddingTop: 12,
        color: corVermelha
    },
    mensagemConfirmacao: {
        textAlign: 'center', 
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: '#545454',
        lineHeight: 18,
        padding: 12
    }
}) 