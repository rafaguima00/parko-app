import React from "react";
import { View, Text, Image, StyleSheet } from 'react-native';
import { theme } from "../../../../Theme";
import { Botao } from "../../../../Components/Botao";

const { fonteNegrito, corPrimaria } = theme

function ModalConfirmacao({ 
    handleClose, mensagemConfirmacao
}) {

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <Image source={require('../../../../../assets/checked.png')} />
                    <Text style={estilos.tituloConfirmacao}>Confirmação</Text>
                    <Text style={estilos.mensagemConfirmacao}>
                        A reserva será automaticamente cancelada se atrasar 10 minutos na chegada. Reembolso parcial da vaga contratada será aplicado.
                    </Text>
                </View>
                <View style={{alignItems: 'center', gap: 12}} >
                    <Botao 
                        children="Concordo"
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={mensagemConfirmacao}
                    />
                    <Botao 
                        children="Não concordo"
                        corDeFundo={'#ff4a4a'}
                        largura={'100%'}
                        negrito
                        corDoTexto={'#fff'}
                        aoPressionar={handleClose}
                    />
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

export default ModalConfirmacao;