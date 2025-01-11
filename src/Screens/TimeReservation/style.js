import { StyleSheet } from "react-native"
import { theme } from "../../Theme"
import styled from "styled-components"

const { 
    corDeFundoAzul, 
    fonteNegrito, 
    corVermelha, 
    corPrimaria,
    corNeutra
} = theme

export const TopoBotao = styled.View`
    padding: 0 ${props => props.espacamento}px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

export const BotaoVoltar = styled.TouchableOpacity``

export const BotaoFechar = styled.TouchableOpacity``

export const WarningText = styled.Text`
    color: ${corVermelha};
    font-family: 'Roboto';
    font-size: 15px;
`

export const AreaView = styled.View`
    background-color: rgba(84, 84, 84, 0.9);
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 32px;
`

export const BotaoFecharModal = styled.TouchableOpacity`
    position: absolute;
    right: 36px;
    top: 32px;
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const TextBotao = styled.Text`
    color: #fff;
    font-weight: bold;
    font-size: 20px;
    text-align: center;
`

export const BotaoSalvar = styled.TouchableOpacity`
    width: 100%;
    background-color: ${corPrimaria};
    height: 54px;
    border-bottom-left-radius: 30px;
    border-bottom-right-radius: 30px;
    justify-content: center;
`

export const CampoDeTexto = styled.View`
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
    background-color: #fff;
    width: 100%;
    height: 200px;
`

export const Quantity = styled.TextInput`
    border: 2px solid ${corPrimaria};
    border-radius: 25px;
    padding: 6px 10px;
    width: 80%;
`

export const RenderHeader = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 22px;
    margin-right: 20px;
    border: 2px solid ${corPrimaria};
    border-radius: 12px;
    padding: 24px;
    background-color: ${corPrimaria};
`

export const Clock = styled.View`
    height: 320px;
    width: 320px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 5px solid #fff;
    font-size: 12px;
    background-color: #0D9CBC;
`

export const Tempo = styled.Text`
    font-weight: 700;
    font-size: 54px;
    color: #fff;
`

export const FundoCinza = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 8px 16px;
`

export const Taxas = styled.View`
    display: flex;
    flex-direction: column;
    gap: 1px;
`

export const LeftText = styled.Text`
    font-weight: 700;
    color: #868686;
`

export const RightText = styled.Text`
    font-weight: 700;
    color: #404040;
`

export const ItemTotal = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f9f9f9;
    margin-top: 12px;
    padding: 16px 20px;
    border-left: 2px solid ${corPrimaria};
`

export const ConfirmationCode = styled.View`
    background-color: #EFEFEF;
    margin: 36px 36px 0;
    padding: 16px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 16px;
`

export const Top = styled.Text`
    color: ${corNeutra};
    font-weight: 700;
    font-size: 22px;
`

export const AlignText = styled.Text`
    text-align: center;
`

export const MensagemConfirmacao = styled.Text`
    font-weight: ${props => props.negrito ? 700 : 400};
    color: #7d7d7d;
`

export const AlignItems = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin: 18px 0;
`

export const ViewNumero = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #d9d9d9;
    width: 49px;
    height: 49px;
    border-radius: 12px;
`

export const Number = styled.Text`
    font-size: 28px;
    font-weight: 700;
    color: ${corNeutra};
`

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