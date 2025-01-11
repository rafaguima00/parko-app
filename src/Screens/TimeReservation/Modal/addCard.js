import React from "react"
import { 
    Text, 
    View, 
    StyleSheet,
    Image, 
    TextInput 
} from 'react-native'
import { theme } from "../../../Theme"
import { Botao } from "../../../Components/Botao"
import { BotaoFechar, BotaoVoltar, styles, TopoBotao } from "../style"
import { Feather } from "react-native-vector-icons"

const { fonteNegrito, corPrimaria } = theme

export default function AddCard({ 
    openModalPagamento,
    setModalAddCartao
}) {
    return (
        <View style={styles.modalContainer}>
            <View style={[styles.dashContent, estilos.escolher, { alignItems: 'center' }]}>
                <TopoBotao espacamento={32}>
                    <BotaoVoltar activeOpacity={0.7} onPress={openModalPagamento}>
                        <Feather name="arrow-left" size={32} color="#444" />
                    </BotaoVoltar>
                    <BotaoFechar activeOpacity={0.7} onPress={() => setModalAddCartao(false)}>
                        <Feather name="x" size={32} color="#444" />
                    </BotaoFechar>
                </TopoBotao>
                <View>
                    <Text style={estilos.tituloPrincipal}>Adicionar Cartão</Text>
                </View>
                <View>
                    <Image source={require('../../../../assets/image-card.png')} style={estilos.imagemCartao} />
                </View>
                <View style={estilos.formCard}>
                    <TextInput 
                        autoCapitalize="words"
                        placeholder="Nome Completo" 
                        placeholderTextColor={'#7d7d7d'} 
                        style={estilos.input}
                    />
                    <TextInput 
                        placeholder="Número do cartão" 
                        placeholderTextColor={'#7d7d7d'} 
                        maxLength={16}
                        keyboardType='numeric'
                        style={estilos.input}
                    />
                    <View style={estilos.flexCvc}>
                        <TextInput 
                            placeholder="Data de validade" 
                            placeholderTextColor={'#7d7d7d'}
                            keyboardType='numeric' 
                            style={estilos.inputInferior}
                        />
                        <TextInput 
                            placeholder="CVC" 
                            placeholderTextColor={'#7d7d7d'} 
                            style={estilos.inputInferior}
                            maxLength={3}
                        />
                    </View>
                </View>
                {/* <TouchableOpacity 
                    style={[estilo.botao, {width: '84%'}]}
                    onPress={openModalPagamento}
                >
                    <Text style={estilo.textoBotao}>Confirmar</Text>
                </TouchableOpacity> */}
                <Botao 
                    children={"Confirmar"}
                    corDeFundo={corPrimaria}
                    largura={'85%'}
                    corDoTexto={'#fff'}
                    negrito
                    aoPressionar={openModalPagamento}
                />
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
        fontFamily: "Roboto_700Bold",
        color: '#444'
    },
    formCard: {
        alignItems: "center",
        marginVertical: 22
    },

    addCard: {
        fontFamily: fonteNegrito,
        color: "#509C76",
        fontSize: 26,
        lineHeight: 32
    },

    imagemCartao: {
        alignSelf: "center",
        marginTop: 5
    },

    input: {
        width: 332,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D",
        marginTop: 4,
        marginBottom: 18
    },

    flexCvc: {
        flexDirection: "row",
        gap: 50
    },

    inputInferior: {
        width: 140,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D"
    }
})