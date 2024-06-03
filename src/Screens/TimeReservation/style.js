import { StyleSheet } from "react-native"
import { theme } from "../../Theme"

const { corDeFundoAzul, fonteNegrito } = theme

export const styles = StyleSheet.create({
    areaContent: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: corDeFundoAzul,
    },
    modalContainer: {
        justifyContent: 'flex-end',
        flex: 1
    },
    dashContent: {
        backgroundColor: '#f4f4f4',
        paddingVertical: 18
    },
    goBack: {
        padding: 16,
        position: "absolute",
        top: 36,
        left: 26
    },
    iconHome: {
        backgroundColor: "#fff",
        borderRadius: 28,
        padding: 16,
        position: "absolute",
        top: 36,
        right: 40
    },
    textTimer: {
        fontSize: 40
    },
    timerStyle: {
        backgroundColor: "#0D9CBC",
        width: 335,
        height: 335,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 200,
        borderWidth: 5,
        borderColor: "#fff",
    },
    buttonContainer: {
        position: "absolute",
        bottom: 25,
        width: "80%",
        gap: 18,
    },
    btFinalizarReserva: {
        borderWidth: 2,
        borderColor: '#fff',
        justifyContent: "center"
    },
    botaoEstenderTempo: {
        backgroundColor: '#f4f4f4',
        height: 47,
        borderRadius: 42,
        justifyContent: "center"
    },
    txtEstenderTempo: {
        fontFamily: fonteNegrito,
        fontSize: 17,
        color: '#7d7d7d',
        textAlign: "center"
    }
})