import styled from "styled-components"
import { theme } from "../../../Theme"

const { corPrimaria, corNeutra, corVermelha } = theme

export const TextPage = styled.Text`
    font-weight: 700;
    color: ${corPrimaria};
    font-size: 24px;
    font-family: "Roboto";
`

export const Subtitle = styled.Text`
    font-family: "Roboto";
    font-size: 14px;
    color: ${corNeutra};
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
    background-color: ${corVermelha};
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
    gap: 12px;
    background-color: #fff;
    width: 100%;
    height: 200px;
`