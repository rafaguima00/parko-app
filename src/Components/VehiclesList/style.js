import styled from "styled-components"
import { theme } from "../../Theme"

const { corPrimaria } = theme

export const BotaoExcluir = styled.TouchableOpacity`
    position: absolute;
    right: -5px;
    top: -5px;
    background-color: rgba(125, 125, 125, 0.6);
    padding: 5px 8px;
    border-radius: 25px;
`

export const SelecionarVeiculo = styled.TouchableOpacity`
    box-shadow: 5px 10px #000;
    margin-top: 10px;
    margin-right: 20px;
    border: 2px solid ${props => props.ativo == true ? corPrimaria : "#f3f6ff"};
    border-radius: 12px;
    padding: 14px;
    width: 180px;
    height: 130px;
    background-color: ${props => props.ativo == true ? corPrimaria : "#f3f6ff"};
`

export const ViewVehicle = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 7px;
    margin-bottom: 4px;
    width: auto;
`

export const NameVehicle = styled.Text`
    font-weight: 700;
    font-family: "Roboto";
    font-size: 22px;
    margin-right: 18px;
    color: ${props => props.ativo == true ? "#fff" : "#545454"};
`

export const LicensePlate = styled.Text`
    margin-bottom: 8px;
    color: ${props => props.ativo == true ? "rgba(245, 248, 255, 0.56)" : "rgba(0, 0, 0, 0.25)"};
`

export const Color = styled.Text`
    color: ${props => props.ativo == true ? "rgba(245, 248, 255, 0.56)" : "rgba(0, 0, 0, 0.25)"};
`