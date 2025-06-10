import styled from "styled-components"
import { theme } from "../../../../Theme"

const { corPrimaria, corNeutra } = theme

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
    width: ${props => props.largura ? props.largura : 100}%;
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

export const Background = styled.View`
    background-color: #F4F4F4;
    width: 90%;
    height: 48%;
    padding: 16px;
    display: flex;
    flex-direction: column;
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
`

export const ToggleContainer = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    border-radius: 20px;
    background-color: #C4C4C4;
`

export const ToggleButton = styled.TouchableOpacity`
    padding: 12px 20px;
    border-radius: 20px;
    background-color: ${props => props.selectedItem === true ? corPrimaria : "transparent"};
    width: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const ToggleText = styled.Text`
    font-family: "Roboto";
    font-weight: 700;
    color: ${props => props.selectedItem === true ? "#F4F4F4" : corPrimaria};
`

export const BotaoSeta = styled.TouchableOpacity`
    background-color: #C4C4C4;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 3px;
    border-radius: 25px;
`

export const HeaderMes = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    margin: 24px 0;
`

export const Titulo = styled.Text`
    font-size: 18px;
    font-weight: 700;
    font-family: 'Roboto';
    color: ${corPrimaria};
`

export const DiasSemana = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 8px;
`

export const TextoDiaSemana = styled.Text`
    width: 14.28%;
    text-align: center;
    color: #7D7D7D;
    font-weight: 700;
`

export const GradeDias = styled.View`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    width: 100%;
`

export const Dia = styled.TouchableOpacity`
    aspect-ratio: 1;
    width: 14.28%;
    border-radius: 25px;
    margin: 4px 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const TextoDia = styled.Text`
    color: ${props => props.desabilitado ? "#C4C4C4" : props.textoSelecionado ? "#fff" : corPrimaria};
    background-color: ${props => props.textoSelecionado ? corPrimaria : "transparent"};
    font-weight: 700;
    border-radius: 25px;
    width: 52%;
    height: 64%;
    text-align: center;
`

export const DiaVazio = styled.View`
    aspect-ratio: 1;
    width: 14.28%;
    margin: 4px 0;
`

export const HorarioView = styled.FlatList`
    margin: 20px 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 8px;
    row-gap: 10px;
`

export const ButtonTime = styled.TouchableOpacity`
    border: 2.5px solid ${corPrimaria};
    padding: 4px 16px;
    border-radius: 10px;
    background-color: ${props => props.clicked ? corPrimaria : "transparent"};
    margin-right: ${props => props.marginright}px;
    margin-bottom: 10px;
`

export const TextButtonTime = styled.Text`
    font-weight: 700;
    color: ${props => props.clicked ? "#f4f4f4" : corPrimaria};
`

export const TextEmpty = styled.Text`
    font-family: 'Roboto';
    color: ${corNeutra};
`