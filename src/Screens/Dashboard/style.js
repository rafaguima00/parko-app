import { StyleSheet } from "react-native";
import { theme } from "../../Theme";

const { fonteNegrito, corPrimaria } = theme;

export const styles = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: "center",
    },
    dashContent: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 18
    },
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
        fontFamily: "Roboto_700Bold",
        color: '#444'
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
    botaoAtivo: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        padding: 14,
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
        padding: 14,
        width: 162,
        height: 117,
        backgroundColor: '#f3f6ff'
    },

    viewCarro: {
        flexDirection: "row",
        alignItems: "center",
        gap: 7,
        marginBottom: 4,
        width: 'auto'
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
        color: '#545454'
    },

    placaCarroAtivo: {
        marginBottom: 8,
        color: 'rgba(245, 248, 255, 0.56)',
    },
    placaCarroDesativado: {
        marginBottom: 8,
        color: 'rgba(0, 0, 0, 0.25)'
    },

    corCarroAtivo: {
        color: 'rgba(245, 248, 255, 0.56)',
    },
    corCarroDesativado: {
        color: 'rgba(0, 0, 0, 0.25)'
    },
    formCard: {
        alignItems: "center",
        justifyContent: 'center',
        marginTop: 40,
        marginBottom: 120
    },
    input: {
        width: 332,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D",
        marginTop: 4,
        marginBottom: 18,
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
        backgroundColor: '#f4f4f4',
        marginBottom: 20,
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
    veiculosVazio: {
        marginVertical: 28,
        padding: 14,
        lineHeight: 20,
        textAlign: 'center',
        fontFamily: "Roboto_400Regular",
        fontSize: 15,
        color: '#7d7d7d'
    },
    botaoCarroDesativado: {
        backgroundColor: "rgba(125, 125, 125, 0.4)",
        height: 47,
        borderRadius: 42,
        justifyContent: "center"
    }
})