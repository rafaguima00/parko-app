import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { fonteNegrito, corPrimaria, corNeutra } = theme
const width = Dimensions.get('screen').width
const height = Dimensions.get('window').height

export const BtRating = styled.TouchableOpacity`
    height: 34px;
    width: 34px;
    background-color: ${props => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
`

export const TxtButton = styled.Text`
    font-weight: 700;
    font-size: 16px;
    font-family: 'Roboto';
    color: ${props => props.textcolor};
`

export const Quit = styled.TouchableOpacity`
    position: absolute;
    right: 16px;
`

export const TxtQuit = styled.Text`
    font-size: 28px;
    font-weight: 700;
    color: ${corNeutra};
`

export const TextArea = styled.TextInput`
    border: 2px solid ${corPrimaria};
    padding: 8px;
    border-radius: 8px;
    height: 182px;
    text-align-vertical: top;
`

export const Div = styled.View`
    margin: 0 16px;
`

export const FeedBackSent = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TextFeedback = styled.Text`
    color: ${corNeutra};
    font-weight: 700;
    font-size: 17.5px;
`

export const EstadoReserva = styled.Text`
    font-size: 17px;
    font-family: 'Roboto';
    color: #7d7d7d;
    margin-bottom: 16px;
`

export const BotaoReserva = styled.TouchableOpacity`
    background-color: ${props => props.background};
    height: ${height * 0.06}px;
    border-bottom-left-radius: 22px;
    border-bottom-right-radius: 22px;
    display: flex;
    justify-content: center;
    position: absolute;
    bottom: 0;
    width: 100%;
`

export const TextoBotao = styled.Text`
    color: #fff;
    font-family: 'Roboto';
    text-align: center;
    font-size: 17px;
    font-weight: 700;
`

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        marginBottom: 130,
        width: width,
        paddingHorizontal: 20,
        backgroundColor: "#f4f4f4"
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
        backgroundColor: "#efefef",
        gap: 30,
        paddingVertical: 10,
        borderRadius: 22,
        position: "relative",
        marginBottom: 42,
        height: height * 0.4
    },
    itemListaEmAndamento: {
        backgroundColor: "#efefef",
        gap: 30,
        paddingVertical: 10,
        borderRadius: 22,
        position: "relative",
        marginBottom: 42,
        height: height * 0.33
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
        fontSize: 17,
        fontWeight: 700
    }, 

    infoReserva: {
        gap: 15,
        paddingBottom: 18,
        marginHorizontal: 32,
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
        fontFamily: fonteNegrito,
        color: corNeutra
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
    reservaVazio: {
        textAlign: 'center', 
        marginVertical: 80, 
        marginHorizontal: 20, 
        color: '#7d7d7d', 
        fontFamily: 'Roboto_400Regular', 
        lineHeight: 19, 
        fontSize: 16
    },
    viewReservation: {
        gap: 12
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
        textAlign: "left",
        color: corNeutra
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
        maxWidth: 100,
        maxHeight: 36,
        textAlign: "right"
    }
})