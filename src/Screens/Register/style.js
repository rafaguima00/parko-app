import { StyleSheet, Dimensions } from "react-native"

const { width } = Dimensions.get('screen')

export const styles = StyleSheet.create({
    displayTela: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        width: width
    },
    imagem: {
        width: width * 0.6, 
        height: (width * 0.6) * 0.5,
        marginVertical: 8,
        paddingHorizontal: 32
    },
    esqueciASenha: {
        marginVertical: 32,
        textDecorationLine: "underline"
    },
    separacao: {
        color: "#A3A3A3"
    },
    view: {
        alignItems: "center",
        flexDirection: "row",
        gap: 32,
        paddingHorizontal: 32
    },
    botao: {
        backgroundColor: "#509C76",
        marginVertical: 16,
        width: 146,
        height: 40,
        borderRadius: 26
    }, 
    textoBotao: {
        color: "#fff",
        textAlign: "center",
        lineHeight: 16,
        paddingHorizontal: 24,
        paddingVertical: 12
    },
    flexInput: {
        paddingHorizontal: 32
    },
    input: {
        backgroundColor: "#DCDCDC",
        width: 332,
        height: 40,
        borderRadius: 50,
        marginTop: 4,
        marginBottom: 18
    }
})