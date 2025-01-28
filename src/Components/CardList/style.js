import styled from "styled-components"

export const DadosCartao = styled.Text`
    text-transform: 'uppercase';
    font-size: 19;
    font-family: "Roboto";
    font-weight: 700;
    color: #f4f4f4;
`

export const ViewCard = styled.TouchableOpacity`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
    width: ${props => props.ativo ? "310px" : "280px"};
    height: ${props => props.ativo ? "200px" : "180px"};
    background-color: rgba(104, 178, 186, 0.6);
    border-radius: 25px;
    padding: 18px;
    margin-right: 15px;
`

export const BotaoExcluir = styled.TouchableOpacity`
    position: absolute;
    right: -5px;
    top: -5px;
    background-color: rgba(125, 125, 125, 0.6);
    padding: 5px 8px;
    border-radius: 25px;
`