import { StyleSheet } from "react-native"
import { theme } from "../../../../Theme";

const { fonteNegrito } = theme;

export const styles = StyleSheet.create({
    infoEstacionamento: {
        position: "absolute",
        bottom: 20,
        paddingHorizontal: 30,
        gap: 6,
        backgroundColor: 'transparent',
        width: "100%"
    },
    nomeEstacionamento: {
        color: "white",
        fontFamily: fonteNegrito,
        fontSize: 26
    },
    viewLocalEstacionamento: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    localEstacionamento: {
        color: "white",
        fontFamily: fonteNegrito,
        fontSize: 16
    },
    distanciaVagaEstrela: {
        color: "white",
        fontFamily: fonteNegrito,
        paddingLeft: 4,
        paddingRight: 10
    },
    botoesSuperiores: {
        position: 'absolute', 
        top: 0, 
        flexDirection: 'row', 
        justifyContent: 'space-between',
        width: '100%'
    }
})