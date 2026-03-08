import React, { useContext, useEffect } from "react"
import { View, Text, StyleSheet } from 'react-native'
import { Feather } from 'react-native-vector-icons'
import { theme } from "../../../../Theme"
import { ReservaContext } from "../../../../Context/reservaContext"
import { useNavigation } from "@react-navigation/native"

const { fonteNegrito, corPrimaria } = theme

export default function SaidaAprovada(props) {

    const { modalSaidaAprovada, setModalSaidaAprovada } = props.states

    const navigation = useNavigation()
    const { setDestination, setReservaFeita } = useContext(ReservaContext)
    
    useEffect(() => {
        if(modalSaidaAprovada) {
            const timer = setTimeout(() => {
                setModalSaidaAprovada(false)
                setReservaFeita(false)
                setDestination(false)
                return navigation.replace("Map")
            }, 4000)

            return () => clearTimeout(timer)
        }
    }, [modalSaidaAprovada])

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <View style={estilos.viewCheck} >
                        <Feather name="check" size={42} color='#f4f4f4' />
                    </View>
                    <Text style={estilos.tituloConfirmacao}>Saída aprovada</Text>
                    <Text style={estilos.mensagemConfirmacao}>Sua saída foi confirmada, obrigado pela sua reserva, volte sempre!</Text>
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
        backgroundColor: corPrimaria, 
        justifyContent: 'center', 
        alignItems: 'center',
        borderRadius: 50
    },
    tituloConfirmacao: {
        fontSize: 24,
        fontFamily: fonteNegrito,
        lineHeight: 25,
        paddingTop: 12,
        color: corPrimaria
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