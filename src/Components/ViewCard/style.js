import styled from "styled-components"
import { StyleSheet } from "react-native"
import { theme } from "../../Theme"

const { corPrimaria, fonteNegrito } = theme

export const styles = StyleSheet.create({
    areaContent: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 32
    },

    container: {
        gap: 24,
        marginHorizontal: 52
    },

    formCard: {
        alignItems: "center",
        marginVertical: 28
    },

    addCard: {
        fontFamily: fonteNegrito,
        color: "#509C76",
        fontSize: 26,
        lineHeight: 32
    },

    input: {
        width: 332,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D",
        marginTop: 4,
        marginBottom: 18,
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

    botaoConfirmar: {
        backgroundColor: corPrimaria,
        height: 47,
        borderRadius: 42,
        justifyContent: "center",
        marginTop: 40,
        marginHorizontal: 48
    },
    dadosCard: {
        textTransform: 'uppercase',
        fontSize: 19,
        fontFamily: fonteNegrito,
        color: '#f4f4f4'
    },
    viewCard: {
        width: 310,
        height: 180,
        backgroundColor: 'rgba(104, 178, 186, 0.6)',
        borderRadius: 25,
        padding: 18,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    }
})
