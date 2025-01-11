import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../../../Theme"
import styled from "styled-components"

const { width } = Dimensions.get('screen')
const { fonteNegrito, corPrimaria, corDeFundoAzul, corNeutra } = theme

export const MaisTempo = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const TextLine = styled.Text`
    color: ${corNeutra};
    text-decoration: underline;
`

export const TextBlue = styled.Text`
    color: ${corDeFundoAzul};
    text-decoration: underline;
`

export const BotaoClicar = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 2px;
`

export const RenderHeader = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 22px;
    margin-right: 20px;
    border: 2px solid ${corPrimaria};
    border-radius: 12px;
    padding: 24px;
    background-color: ${corPrimaria};
`

export const styles = StyleSheet.create({
    dashContent: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 18
    },
    botaoLigar: {
        flexDirection: "row", 
        gap: 8, 
        alignItems: "center", 
        backgroundColor: "#DCEBEE",
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 12
    },
    botaoCompartilhar: {
        flexDirection: "row", 
        gap: 8, 
        alignItems: "center", 
        backgroundColor: "#0097b9",
        paddingHorizontal: 22,
        paddingVertical: 12,
        borderRadius: 12
    },
    informacoes: {
        marginTop: 16, 
        borderBottomWidth: 1, 
        borderBottomColor: "#7d7d7d", 
        gap: 16, 
        width: width, 
        alignSelf: "center", 
        paddingHorizontal: 28, 
        paddingBottom: 16
    },
    textoInformacoes: {
        color: "#353535", 
        fontFamily: fonteNegrito, 
        fontSize: 22
    },
    viewContent: {
        flexDirection: "row", 
        alignItems: "center", 
        gap: 4
    },
    textContent: {
        color:"#7d7d7d", 
        fontFamily: fonteNegrito
    },
    horarios: {
        marginTop: 16,
        gap: 16,
        width: width,
        alignSelf: "center",
        paddingHorizontal: 28,
        paddingBottom: 16
    },
    textoHorarios: {
        color: "#353535",
        fontFamily: fonteNegrito,
        fontSize: 22
    },
    botaoHorariosAtivo: {
        marginRight: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        paddingVertical: 24,
        paddingLeft: 24,
        paddingRight: 42,
        backgroundColor: corPrimaria
    },
    botaoHorariosDesativado: {
        marginRight: 20,
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
    botoesInferiores: {
        flexDirection: "row", 
        alignItems: "center", 
        justifyContent: "space-between", 
        marginTop: 16,
        marginHorizontal: 26,
    },
    botaoIrAgora: {
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2, 
        borderColor: corPrimaria,
        width: 174,
        height: 52,
    },
    botaoIrAgoraInativo: {
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2, 
        borderColor: "rgba(125, 125, 125, 0.5)",
        width: 174,
        height: 52,
        backgroundColor: "rgba(125, 125, 125, 0.1)"
    },
    botaoAgendar: {
        alignItems: 'center',
        justifyContent: "center",
        borderWidth: 2,
        borderColor: 'transparent',
        width: 174,
        height: 52,
        backgroundColor: corPrimaria
    }
})