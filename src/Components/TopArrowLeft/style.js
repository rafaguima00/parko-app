import styled from "styled-components"
import { theme } from "../../Theme"

const { corPrimaria } = theme

export const Cabecalho = styled.View`
    display: flex;
    flex-direction: column;
    gap: 24px;
    margin-top: 20px;
    margin-left: 28px;
`

export const TextPage = styled.Text`
    font-weight: 700;
    color: ${corPrimaria};
    font-size: 26px;
    font-family: "Roboto";
`