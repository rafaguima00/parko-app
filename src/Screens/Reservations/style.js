import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"

const { fonteNegrito, corPrimaria } = theme
const width = Dimensions.get('screen').width

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        marginBottom: 130,
        width: width,
        paddingHorizontal: 40
    },

    cabecalho: {
        gap: 24,
        marginVertical: 20
    },

    topoReservas: {
        fontFamily: fonteNegrito,
        color: corPrimaria,
        fontSize: 26,
        lineHeight: 32
    },
    itemLista: {
        backgroundColor: "#d4d4d4",
        gap: 30,
        paddingVertical: 10,
        borderTopRightRadius: 22,
        borderTopLeftRadius: 22
    },

    viewEstacionamento: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 30,
        paddingLeft: 18
    },

    nomeEstacionamento: {
        color: "#545454",
        fontSize: 17
    }, 

    infoReserva: {
        gap: 15,
        paddingBottom: 18,
        paddingHorizontal: 32,
        borderBottomWidth: 1,
        borderColor: "#C4C4C4",
        justifyContent: "space-between",
    },

    entrada: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    infoEntrada: {
        fontFamily: fonteNegrito
    },

    horaEntrada: {
        flexDirection: "row",
        gap: 4
    },

    infoData: {
        color: "#7d7d7d"
    },

    areaAvaliacao: {
        gap: 10,
        marginBottom: 20,
        alignItems: "center",
    },

    textoReserva: {
        textAlign: "center",
        color: "#0097b9",
        fontFamily: fonteNegrito
    },

    agrupar: {
        flexDirection: "row",
        gap: 10
    },

    botao: {
        backgroundColor: corPrimaria,
        height: 54,
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        justifyContent: "center",
        marginBottom: 42
    },

    textoBotao: {
        fontFamily: fonteNegrito,
        fontSize: 17,
        color: "white",
        textAlign: "center"
    },
    reservaVazio: {
        textAlign: 'center', 
        marginVertical: 80, 
        marginHorizontal: 20, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        lineHeight: 19, 
        fontSize: 16
    }
})