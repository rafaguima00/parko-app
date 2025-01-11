import styled from "styled-components"
import { theme } from "../../Theme"

const { corPrimaria, corNeutra } = theme

export const Cabecalho = styled.View`
    display: flex;
    flex-direction: column;
    margin: 20px 28px 0;
    gap: 20px;
`

export const TextAjuda = styled.Text`
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 26px;
    color: ${corPrimaria};
`

export const TextInputArea = styled.View`
    margin: 20px 28px 0;
`

export const ListView = styled.View`
    flex: 1;
    margin: 28px;
`

export const Separator = styled.View`
    height: 1px;
    background-color: ${corNeutra};
    margin: 7px 1px;
`

export const ItemList = styled.View`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`

export const Faq = styled.Text`
    font-size: 19px;
    font-weight: 700;
    color: ${corNeutra};
`

export const ViewHeader = styled.View`
    margin-bottom: 18px;
`

export const TextSubject = styled.Text`
    color: ${corNeutra};
    max-width: 320px;
`

export const ButtonPlus = styled.TouchableOpacity`
    display: flex;
    justify-content: center;
    align-items: center;
`

export const Plus = styled.Text`
    color: ${corNeutra};
    font-size: 26px;
    font-weight: 700;
`