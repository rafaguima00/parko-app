import styled from "styled-components"
import { theme } from "../../../../Theme"
import { Dimensions } from "react-native"

const { corPrimaria, corNeutra } = theme
const width = Dimensions.get('screen').width

export const AreaView = styled.View`
    background-color: rgba(84, 84, 84, 0.9);
    display: flex;
    height: 100%;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 32px;
`

export const BotaoFechar = styled.View`
    padding: 12px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
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
    padding: 2px 10px;
    width: 56%;
`

export const MsgConfirmacao = styled.Text`
    text-align: center;
    font-family: 'Roboto';
    font-size: 14px;
    color: ${props => props.textcolor ? props.textcolor : corNeutra};
    font-weight: ${props => props.negrito ? 700 : 400};
`

export const Header = styled.View`
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 10px;
    min-height: 40px;
    width: 200px;
`