import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { theme } from "../../../Theme";
import { styles } from "../style";

const { fonteNegrito } = theme;

export default function SelecionarPgto({ openModalPagamento }) {
    return(
        <View style={styles.modalContainer}>
            <View style={[styles.dashContent, estilos.escolher]}>
                <View style={{alignItems: 'center'}} >
                    <Text style={estilos.tituloPrincipal}>Pagamento</Text>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
                    <Text style={estilos.txtSelecioneCartao} >Cartão de crédito</Text>
                    <TouchableOpacity onPress={openModalPagamento}>
                        <Text style={estilos.botaoMais}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
                    <Text style={estilos.txtSelecioneCartao} >Cartão de débito</Text>
                    <TouchableOpacity>
                        <Text style={estilos.botaoMais}>+</Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} >
                    <Text style={estilos.txtSelecioneCartao}>Pix</Text>
                    <TouchableOpacity>
                        <Text style={estilos.botaoMais}>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    escolher: {
        marginTop: -14,
        backgroundColor: '#DCEBEE',
        width: '100%',
        height: '70%',
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        paddingHorizontal: 26
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
    }
})