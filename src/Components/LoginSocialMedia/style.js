import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loginSecundario: {
        alignItems: "center",
        gap: 2
    },
    botaoFacebook: {
        backgroundColor: "#4267B2",
        marginTop: 24,
        width: 332,
        height: 36,
        borderRadius: 26,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }, 
    botaoGoogle: {
        backgroundColor: "#DD4B39",
        marginTop: 10,
        width: 332,
        height: 36,
        borderRadius: 26,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }, 
    botaoApple: {
        backgroundColor: "#BABABA",
        marginTop: 10,
        width: 332,
        height: 36,
        borderRadius: 26,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    }, 
    textoBotaoRedeSocial: {
        color: "#fff",
        textAlign: "center",
        lineHeight: 20,
        paddingHorizontal: 24,
        paddingVertical: 8
    }
})