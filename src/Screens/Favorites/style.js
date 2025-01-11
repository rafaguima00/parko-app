import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { fonteNegrito, corNeutra } = theme
const { width } = Dimensions.get('screen')

export const ImageParking = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

export const Separator = styled.View`
    height: 1px;
    background-color: ${corNeutra};
    margin: 7px 1px;
`

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        width: width,
        paddingHorizontal: 40
    },

    cabecalho: {
        gap: 24,
        marginVertical: 20
    },

    topoFavoritos: {
        fontFamily: fonteNegrito,
        color: "#509C76",
        fontSize: 26,
        lineHeight: 32
    },

    viewLista: {
        marginBottom: 140,
        paddingHorizontal: 16
    },
    dados: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 30,
        paddingVertical: 10
    },
    itens: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    nome: {
        color: "#545454",
        fontSize: 17
    },
    botaoOk: {
        fontFamily: fonteNegrito
    },
    mensagemVazio: {
        textAlign: 'center',
        marginVertical: 80,
        marginHorizontal: 20,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        lineHeight: 19,
        fontSize: 16
    }

})