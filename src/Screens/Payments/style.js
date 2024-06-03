import { StyleSheet, Dimensions } from "react-native"
import { theme } from "../../Theme"

const { fonteNegrito } = theme
const width = Dimensions.get('screen').width

export const styles = StyleSheet.create({
    areaContent: {
        marginTop: 32,
        width: width,
        paddingHorizontal: 32,
        justifyContent: "center",
    },

    cabecalho: {
        gap: 24
    },

    telaPagamento: {
        fontFamily: fonteNegrito,
        color: "#509C76",
        fontSize: 26,
        lineHeight: 32
    },

    circuloAzul: {
        backgroundColor: "#0097B9",
        width: 160,
        height: 160,
        marginTop: 36,
        marginBottom: 72,
        borderRadius: 50,
        alignSelf: "center",
        position: "relative"
    },

    imagemCard: {
        alignSelf: "center",
        top: 17
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
        width: 310,
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
        width: 330,
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