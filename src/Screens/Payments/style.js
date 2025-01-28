import { StyleSheet } from "react-native"
import { theme } from "../../Theme"

const { fonteNegrito } = theme

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        marginHorizontal: 20,
        justifyContent: "center"
    },

    cabecalho: {
        gap: 24,
        marginVertical: 20
    },

    telaPagamento: {
        fontFamily: fonteNegrito,
        color: "#509C76",
        fontSize: 26,
        lineHeight: 32
    },

    circuloAzul: {
        marginTop: 36,
        marginBottom: 72,
        alignSelf: "center"
    },

    imagemCard: {
        alignSelf: "center"
    },

    selectVehicle: {
        fontFamily: fonteNegrito,
        color: "#7D7D7D",
        fontSize: 18
    },

    fixItems: {
        marginTop: 20
    },

    imagecard: {
        marginRight: 28,
        width: 300,
        height: 190
    },

    imagecardAtivo: {
        marginRight: 28,
        width: 330,
        height: 200
    },
    avisoCartao: {
        textAlign: 'center',
        marginVertical: 80,
        marginHorizontal: 20,
        color: '#7d7d7d',
        fontFamily: 'Roboto_400Regular',
        lineHeight: 19,
        fontSize: 16,
    },
    dadosCard: {
        textTransform: 'uppercase',
        fontSize: 19,
        fontFamily: fonteNegrito,
        color: '#f4f4f4'
    },
    viewCard: {
        width: 280,
        height: 180,
        backgroundColor: 'rgba(104, 178, 186, 0.6)',
        borderRadius: 25,
        padding: 18,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginRight: 15
    },
    viewCardAtivo: {
        width: 310,
        height: 200,
        backgroundColor: 'rgba(104, 178, 186, 0.6)',
        borderRadius: 25,
        padding: 18,
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
        marginRight: 15
    }
})