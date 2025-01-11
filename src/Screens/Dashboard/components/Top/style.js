import styled from "styled-components"

export const ImageView = styled.View`
    width: 100%;
`

export const BotoesSuperiores = styled.View`
    position: absolute;
    top: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
`

export const InfoEstacionamento = styled.View`
    position: absolute;
    bottom: 20px;
    left: 20px;
    gap: 6px;
    max-width: 370px;
    max-height: 125px;
`

export const Nome = styled.Text`
    color: #fff;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 26px;
`

export const Local = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
`

export const Endereco = styled.Text`
    color: #fff;
    font-family: 'Roboto';
    font-weight: 700;
    font-size: 16px;
`

export const Icons = styled.View`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const TextIcon = styled.Text`
    color: #fff;
    font-family: 'Roboto';
    font-weight: 700;
    padding: 0 10px 0 4px;
`