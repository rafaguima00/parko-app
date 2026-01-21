import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { width } = Dimensions.get('screen')
const { fonteNegrito, corPrimaria } = theme
const isTablet = width >= 750

export const styles = StyleSheet.create({
    content: {
        backgroundColor: "#fff",
        alignItems: "center",
        minHeight: "100%"
    },
    topView: {
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: "space-between",
        width: width,
        paddingHorizontal: 40,
        paddingBottom: 20
    },  
    top: {
        width: width,
        height: 420
    },
    perfil: {
        position: "relative",
        backgroundColor: "white",
        marginBottom: 50,
        paddingHorizontal: 48,
        alignSelf: "center",
        alignItems: "center",
        width: width
    },
    botaoEdit: {
        backgroundColor: "#523499",
        marginTop: -35,
        marginBottom: 40,
        borderWidth: 2,
        borderColor: "white",
        borderRadius: 45,
        padding: 18,
        width: 66,
        alignSelf: "center",
        alignItems: "center"
    },
    textInput: {
        backgroundColor: '#f4f4f4',
        width: 170,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },
    nome: {
        fontFamily: fonteNegrito,
        color: "#545454",
        fontSize: 16,
        marginBottom: 12
    },
    displayUsuario: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 24,
        width: isTablet ? 480 : "100%"
    },
    dadosUsuario: {
        fontFamily: fonteNegrito,
        fontSize: 22,
        color: corPrimaria
    },
    textoBotao: {
        fontFamily: fonteNegrito,
        fontSize: 17,
        color: "white",
        textAlign: "center"
    }
})

export const DivButton = styled.View`
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    align-items: center;
    margin-top: 32px;
`