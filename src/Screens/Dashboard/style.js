import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { fonteNegrito, corPrimaria, corNeutra } = theme

export const AreaView = styled.SafeAreaView`
    display: flex;
    align-items: center;
`

export const TopModal = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
`

export const VoltarTelaAnterior = styled.TouchableOpacity`
    position: absolute;
    left: 0;
`

export const TituloPrincipal = styled.Text`
    color: #444;
    text-align: center;
    line-height: 35px;
    font-size: 24px;
    font-family: "Roboto";
    font-weight: 700;
`

export const FundoCinza = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 8px 16px;
`

export const Taxas = styled.View`
    display: flex;
    flex-direction: column;
    gap: 1px;
`

export const LeftText = styled.Text`
    font-weight: 700;
    color: #868686;
`

export const RightText = styled.Text`
    font-weight: 700;
    color: #404040;
`

export const styles = StyleSheet.create({
    dashContent: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 18
    },
    escolher: {
        marginTop: -14,
        backgroundColor: '#DCEBEE',
        width: '100%',
        height: '75%',
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22,
        paddingHorizontal: 26
    },
    txtSelecioneVeiculo: {
        lineHeight: 42,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        fontSize: 15
    },
    botaoMais: {
        fontSize: 44,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular'
    },
    avisoVeiculo: {
        textAlign: 'center',
        marginVertical: 80,
        marginHorizontal: 20,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        lineHeight: 19,
        fontSize: 16
    },
    itens: {
        marginVertical: 20,
        alignItems: 'center',
    },
    formCard: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 120
    },
    txtSelecioneCartao: {
        lineHeight: 35,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        fontSize: 15
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
        backgroundColor: '#f9f9f9',
        marginTop: 13,
        paddingHorizontal: 16,
        paddingVertical: 20,
        borderLeftWidth: 5,
        borderColor: '#509C76'
    },
    formAddCard: {
        alignItems: "center",
        marginVertical: 14,
        justifyContent: 'center'
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
    flexCvc: {
        flexDirection: "row",
        gap: 50
    },

    inputInferior: {
        width: 140,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D"
    },
    total: {
        fontFamily: fonteNegrito,
        lineHeight: 18,
        fontSize: 15
    },
    botaoCarroDesativado: {
        backgroundColor: "rgba(125, 125, 125, 0.4)",
        height: 47,
        borderRadius: 42,
        justifyContent: "center"
    },
    
    input: {
        width: 332,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D",
        marginTop: 4,
        marginBottom: 18,
    },
    txtSelecioneVeiculo: {
        lineHeight: 42,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        fontSize: 15
    },
    botaoMais: {
        fontSize: 44,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular'
    },
    avisoVeiculo: {
        textAlign: 'center',
        marginVertical: 80,
        marginHorizontal: 20,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        lineHeight: 19,
        fontSize: 16
    },
    itens: {
        marginVertical: 20,
        alignItems: 'center',
    },
    veiculosVazio: {
        marginVertical: 28,
        padding: 14,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 15,
        color: '#7d7d7d'
    },
    botaoAtivo: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        padding: 8,
        width: 162,
        height: 117,
        backgroundColor: '#509c76'
    },
    botaoDesativado: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: 'transparent',
        borderRadius: 12,
        padding: 8,
        width: 162,
        height: 117,
        backgroundColor: '#f3f6ff'
    },

    viewCarro: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7
    },

    nomeCarroAtivo: {
        fontFamily: fonteNegrito,
        fontSize: 22,
        marginRight: 18,
        color: '#fff'
    },
    nomeCarroDesativado: {
        fontFamily: fonteNegrito,
        fontSize: 22,
        marginRight: 18,
        color: '#545454',
    },

    placaCarroAtivo: {
        marginBottom: 8,
        color: 'rgba(245, 248, 255, 0.56)',
    },
    placaCarroDesativado: {
        marginBottom: 8,
        color: 'rgba(0, 0, 0, 0.25)',
    },

    corCarroAtivo: {
        color: 'rgba(245, 248, 255, 0.56)',
    },
    corCarroDesativado: {
        color: 'rgba(0, 0, 0, 0.25)',
    },
})