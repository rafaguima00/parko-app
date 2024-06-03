import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    displayTela: {
        alignItems: "center",
        marginVertical: 48
    },
    imagem: {
        marginVertical: 40,
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