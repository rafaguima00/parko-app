import { StyleSheet } from 'react-native';
import { theme } from '../../Theme';

const { corPrimaria, fonteNegrito } = theme;

export const styles = StyleSheet.create({
    menuLateral: {
        justifyContent: 'center',
        alignItems: "center",
        margin: 0,
        paddingVertical: 16
    },
    botaoEdit: {
        backgroundColor: "#523499",
        borderRadius: 50,
        borderWidth: 2,
        borderColor: "white",
        paddingVertical: 14,
        paddingHorizontal: 16,
        alignSelf: "center",
        alignItems: "center",
        position: "absolute",
        right: -8
    },
    linkNavigation: {
        flexDirection: "row",
        alignItems: "center",
        gap: 6
    },
    link: {
        fontFamily: "Roboto_400Regular",
        fontSize: 18,
        lineHeight: 42,
        color: "#545454"
    },
    botao: {
        backgroundColor: corPrimaria,
        height: 38,
        width: 155,
        marginTop: 90,
        borderRadius: 42,
        justifyContent: "center"
    },
    textoBotao: {
        fontFamily: fonteNegrito,
        fontSize: 15,
        color: "#fff",
        textAlign: "center"
    }
})