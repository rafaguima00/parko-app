import React, { useEffect } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native'
import { theme } from "../../../Theme"

const { fonteNegrito } = theme

export default function ModalMsgConfirmacao({ modalAtivo, handleClose }) {

    const navigation = useNavigation()
    
    useEffect(() => {
        if(modalAtivo) {
            const timer = setTimeout(() => {
                handleClose()
                navigation.navigate('Map')
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
                    <Text style={estilos.mensagemConfirmacao}>1 Vaga reservada para você!</Text>
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