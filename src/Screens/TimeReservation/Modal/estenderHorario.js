import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import infoEstacionamento from "../../../Mocks/infoEstacionamento";
import { Botao } from "../../../Components/Botao";
import { theme } from "../../../Theme";
import { styles } from "../style";

const { corPrimaria, fonteNegrito } = theme

export default function EstenderHorario({ abreModalPagamento }) {

    const [botaoAtivo, setBotaoAtivo] = useState(null);

    const cliqueBotao = (item) => {
        setBotaoAtivo(item.preco);
    };

    const renderItem = ({ item }) => {
        const botaoClicado = botaoAtivo === item.preco;

        return (
            <TouchableOpacity 
                style={(
                    botaoClicado ? estilos.botaoHorariosAtivo : estilos.botaoHorariosDesativado
                )} 
                onPress={() => cliqueBotao(item)} 
                activeOpacity={0.9}>
                <Text 
                    style={(
                        botaoClicado ? estilos.textoBotaoAtivo : estilos.textoBotaoDesativado
                    )}>
                        { item.tempoPermanencia }
                </Text>
                <Text 
                    style={(
                        botaoClicado ? estilos.textoBotaoPrecoAtivo : estilos.textoBotaoPrecoDesativado
                    )}>
                        { item.preco }
                    </Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.modalContainer}>
            <View style={[
                styles.dashContent, 
                {alignItems: 'center', borderTopRightRadius: 20, borderTopLeftRadius: 20}
            ]}>
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={estilos.tituloPrincipal}>Quer estender o horário da sua reserva?</Text>
                </View>
                <FlatList 
                    contentContainerStyle={estilos.itens}
                    numColumns={2}
                    data={infoEstacionamento.horarios}
                    renderItem={renderItem}
                    keyExtractor={item => {item.preco}}
                />
                <View style={{flexDirection: 'row', marginBottom: 28}}>
                    <Text style={{color: '#545454', lineHeight: 36, fontSize: 15}}>Ainda precisa de mais tempo?</Text>
                    <TouchableOpacity>
                        <Text style={{color: '#0097b9', textDecorationLine: 'underline', lineHeight: 36, fontSize: 15}}> Clica aqui</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '85%', alignItems: 'center'}}>
                    <Botao 
                        children={"Estender"}
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        negrito
                        corDoTexto={'#fff'}
                        aoPressionar={abreModalPagamento}
                    />
                </View>
            </View>
        </View>
    )
}

const estilos = StyleSheet.create({
    tituloPrincipal: {
        lineHeight: 35, 
        fontSize: 24, 
        fontFamily: "Roboto_700Bold",
        color: '#444', 
        paddingVertical: 26,
        paddingHorizontal: 36,
        textAlign: 'center'
    },
    textoHorarios: {
        color: "#353535", 
        fontFamily: fonteNegrito, 
        fontSize: 22
    },
    botaoHorariosAtivo: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        paddingVertical: 24,
        paddingLeft: 24,
        paddingRight: 42,
        backgroundColor: '#509c76'
    },
    botaoHorariosDesativado: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        paddingVertical: 24,
        paddingLeft: 24,
        paddingRight: 42,
        backgroundColor: 'transparent'
    },
    textoBotaoDesativado: {
        fontFamily: fonteNegrito,
        fontSize: 16,
        lineHeight: 24
    },
    textoBotaoAtivo: {
        fontFamily: fonteNegrito,
        fontSize: 16,
        lineHeight: 24,
        color: '#f4f4f4'
    },
    textoBotaoPrecoDesativado: {
        color: "#545454"
    },
    textoBotaoPrecoAtivo: {
        color: '#adcfc3'
    },
    itens: {
        marginVertical: 20, 
        alignItems: 'center',
    },
})