import { TouchableOpacity, Text } from "react-native"

export const Botao = ({
    estilo,
    corDeFundo,
    largura,
    altura,
    aoPressionar,
    opacidade,
    disabled = false,
    corDoTexto,
    negrito = false,
    children 
}) => {

    return (
        <TouchableOpacity
            style={[
                estilo,
                {
                    backgroundColor: corDeFundo,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: largura,
                    height: altura,
                    padding: 12,
                    borderRadius: 50
                }
            ]}
            onPress={aoPressionar}
            activeOpacity={opacidade}
            disabled={disabled}
        >
            <Text
                style={{
                    color: corDoTexto,
                    fontFamily: (negrito ? "Roboto_700Bold" : "Roboto_400Regular"),
                    fontSize: 17,
                    textAlign: 'center'
                }}
            >
                {children}
            </Text>
        </TouchableOpacity>
    )
}