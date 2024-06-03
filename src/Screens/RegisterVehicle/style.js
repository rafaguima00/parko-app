import { StyleSheet, Dimensions } from "react-native";
import { theme } from "../../Theme";

const width = Dimensions.get('screen').width
const { fonteNegrito } = theme;

export const styles = StyleSheet.create({
    areaContent: {
        flex: 1,
        width: width,
        marginVertical: 52
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