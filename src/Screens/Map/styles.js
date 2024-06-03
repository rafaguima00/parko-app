import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"

const { width } = Dimensions.get('screen')
const { fonteNegrito, corPrimaria } = theme

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: width
    },
    map: {
        flex: 1
    },
    componentesMapa: {
        position: "absolute",
        top: 40,
        left: 30,
        width: "87%",
        flexDirection: "row",
        gap: 20
    },
    icone: {
        backgroundColor: "white",
        padding: 12,
        borderRadius: 50
    },
    buscar: {
        width: width,
        position: "absolute",
        bottom: 0,
        paddingHorizontal: 32,
        paddingVertical: 22,
        gap: 10
    },
    estouIndoPara: {
        fontFamily: fonteNegrito,
        fontSize: 24,
        lineHeight: 32
    },
    inputBuscar: {
        backgroundColor: "#E9E9E9",
        height: 47,
        borderRadius: 42,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: "#509C76"
    },
    rotaEstacionamento: {
        width: width,
        position: "absolute",
        bottom: 0,
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        paddingHorizontal: 32,
        paddingVertical: 24,
        gap: 14,
        backgroundColor: '#fff',
        justifyContent: 'space-evenly'
    },
    tituloEstacionamento: {
        color: '#353535',
        fontFamily: "Roboto_700Bold",
        fontSize: 18
    },
    localEstacionamento: {
        color: '#0097b9',
        fontFamily: "Roboto_700Bold",
        fontSize: 14,
        maxWidth: 200,
        maxHeight: 50
    },
    distanciaEstacionamento: {
        color: '#7d7d7d',
        fontFamily: "Roboto_700Bold",
        fontSize: 14
    },
    botao: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5,
        borderWidth: 2,
        borderRadius: 16,
        borderColor: "#7d7d7d",
        padding: 12,
        width: 100,
        height: 50
    },
    textoBotao: { 
        fontFamily: fonteNegrito, 
        fontSize: 17, 
        color: '#fff', 
        textAlign: 'center' 
    },
    textoBotaoPreco: {
        fontSize: 16,
        fontFamily: "Roboto_700Bold",
        color: "#7d7d7d"
    },
    nome: {
        color: "#545454",
        fontSize: 17
    },
    selecionarOpcao: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 26,
        marginTop: 32,
        gap: 20
    },
    infoEstacionamento: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 15
    },
    infoAddress: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7
    },
    infoDistance: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 6
    },
    viewButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 15
    },
    itemLista: {
        position: 'absolute',
        bottom: 0,
        backgroundColor: "#f4f4f4",
        width: "84%",
        height: "33%",
        gap: 16,
        paddingVertical: 10,
        borderRadius: 22,
        marginHorizontal: 32,
        marginBottom: 32,
        justifyContent: "space-between"
    },

    viewEstacionamento: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        gap: 30,
        paddingLeft: 24
    },

    nomeEstacionamento: {
        color: "#545454",
        fontSize: 17
    },

    infoVeiculo: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 10,
        paddingHorizontal: 26
    },

    textoInicio: {
        marginRight: 10,
        fontFamily: fonteNegrito,
        textAlign: "left"
    },

    textoVeiculo: {
        flexDirection: "row",
        gap: 12,
        alignItems: 'center'
    },

    infoItemCarro: {
        color: "#7d7d7d",
        overflow: "hidden",
        maxWidth: 81,
        maxHeight: 36,
        textAlign: "right"
    },

    infoItemPlaca: {
        color: "#7d7d7d",
        maxWidth: 72,
        maxHeight: 36,
        textAlign: "right"
    },

    infoItemCor: {
        color: "#7d7d7d",
        maxWidth: 70,
        maxHeight: 36,
        textAlign: "right"
    },

    infoItem: {
        color: "#7d7d7d",
        width: 70,
        maxHeight: 36,
        textAlign: "right"
    },
    botaoReserva: {
        backgroundColor: corPrimaria,
        height: 54,
        width: "100%",
        borderBottomLeftRadius: 22,
        borderBottomRightRadius: 22,
        justifyContent: "center",
        marginTop: 18
    },
    viewReservation: {
        gap: 16
    }
})