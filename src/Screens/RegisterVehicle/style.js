import { StyleSheet } from "react-native"
import { theme } from "../../Theme"

const { fonteNegrito } = theme

export const styles = StyleSheet.create({
    areaContent: {
        flex: 1,
        marginTop: 32,
        marginHorizontal: 20,
    },

    container: {
        gap: 24,
        marginHorizontal: 52
    },

    formCard: {
        justifyContent: 'center',
        alignItems: "center",
        marginVertical: 50
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
    }
})