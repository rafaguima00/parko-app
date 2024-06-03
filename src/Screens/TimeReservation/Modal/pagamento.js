import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from "../../../Theme";
import infoEstacionamento from "../../../Mocks/infoEstacionamento";
import { Botao } from "../../../Components/Botao";
import { styles } from "../style";

const { fonteNegrito, corPrimaria } = theme;

export default function ModalPagamento({ 
    abreModalAddCard, 
    openModalSelecionarPgto, 
    pagamentoConfirmado 
}) {
    return (
        <View style={styles.modalContainer} >
            <View style={[styles.dashContent, estilos.escolher]} >
                <View style={{alignItems: 'center'}} >
                    <Text style={estilos.tituloPrincipal}>Pagamento</Text>
                </View>
                <View style={{
                    flexDirection: 'row', 
                    alignItems: 'center', 
                    justifyContent: 'space-between', 
                    marginHorizontal: 22
                }}>
                    <Text style={estilos.txtSelecioneCartao} >Selecione seu cartão de crédito</Text>
                    <TouchableOpacity onPress={abreModalAddCard}>
                        <Text style={estilos.botaoMais}>+</Text>
                    </TouchableOpacity>
                </View>
                <Text style={estilos.avisoCartao}>
                    Nenhum cartão cadastrado no momento. Clique no botão "+" para adicionar sua forma de pagamento
                </Text>
                <View style={{justifyContent: 'center'}} >
                    <TouchableOpacity onPress={openModalSelecionarPgto} >
                        <Text style={estilos.escolherFormaPgto}>Escolher outra forma de pagamento</Text>
                    </TouchableOpacity>
                </View>
                <View style={estilos.itemTotal}>
                    <Text style={{fontFamily: fonteNegrito, lineHeight: 18, fontSize: 15}} >TOTAL</Text>
                    <Text style={{fontFamily: fonteNegrito, lineHeight: 18, fontSize: 15}}>
                        { infoEstacionamento.horarios[0].preco }
                    </Text>
                </View>
                <View style={{alignItems: 'center', width: '100%'}} >
                    <Botao 
                        children={"Confirmar"}
                        corDeFundo={corPrimaria}
                        largura={'85%'}
                        corDoTexto={"#fff"}
                        negrito
                        aoPressionar={pagamentoConfirmado}
                    />
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    escolher: {
        backgroundColor: '#DCEBEE'
    },
    tituloPrincipal: {
        lineHeight: 35, 
        fontSize: 24, 
        fontFamily: fonteNegrito,
        color: '#444'
    },
    txtSelecioneCartao: {
        lineHeight: 35, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        fontSize: 15
    },
    botaoMais: {
        fontSize: 44, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular'
    },
    avisoCartao: {
        textAlign: 'center', 
        marginVertical: 80, 
        marginHorizontal: 20, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        lineHeight: 19, 
        fontSize: 16
    },
    imagecard: {
        marginRight: 28,
        marginTop: 10
    },
    escolherFormaPgto: {
        textAlign: 'center', 
        textDecorationLine: 'underline',
        color: '#7d7d7d',
        lineHeight: 17
    },
    itemTotal: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#f4f4f4',
        marginBottom: 20,
        marginTop: 13,
        marginHorizontal: 22,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderLeftWidth: 5,
        borderColor: corPrimaria
    }
})