import { StyleSheet } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { corPrimaria, fonteNegrito } = theme

export const SelecionarVeiculo = styled.TouchableOpacity`
    box-shadow: 5px 10px #000;
`

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        marginHorizontal: 20,
        justifyContent: "center"
    },
    cabecalho: {
        gap: 24,
        marginTop: 20,
        marginLeft: 28
    },
    telaVeiculos: {
        fontFamily: fonteNegrito,
        color: corPrimaria,
        fontSize: 26,
        lineHeight: 32
    },
    circuloVerde: {
        marginTop: 64,
        marginBottom: 72,
        alignSelf: "center"
    },
    imagemVeiculo: {
        alignSelf: "center"
    },
    selectVehicle: {
        fontFamily: fonteNegrito,
        color: "#7D7D7D",
        fontSize: 18
    },
    fixItems: {
        marginTop: 20,
        marginBottom: 40
    },
    botaoAtivo: {
        marginTop: 10,
        marginRight: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        padding: 14,
        width: 180,
        height: 130,
        backgroundColor: corPrimaria
    },
    botaoDesativado: {
        marginTop: 10,
        marginRight: 20,
        borderRadius: 12,
        padding: 14,
        width: 180,
        height: 130,
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
        color: "#fff"
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
    veiculosVazio: {
        textAlign: 'center',
        justifyContent: 'center',
        marginVertical: 40,
        marginHorizontal: 20,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        lineHeight: 19,
        fontSize: 16
    }
})