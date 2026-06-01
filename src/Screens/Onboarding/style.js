import styled from "styled-components"
import { theme } from "../../Theme"

const { corNeutra, corPrimaria, corRoxa } = theme

export const AreaView = styled.View`
    max-height: 100%;
    padding: 88px 32px 64px;
`

export const TextView = styled.View`
    width: 60%;
`

export const BoldMessage = styled.Text`
    font-weight: 700;
`

export const NotBoldMessage = styled.Text`
    color: ${corNeutra};
    font-size: 27px;
    line-height: 37px;
`

export const SelectedView = styled.View`
    margin: 24px 0 64px;
    gap: 8px;
    flex-direction: row;
`

export const Selected = styled.View`
    width: ${props => props.selected === true ? 20 : 10}px;
    height: 10px;
    background-color: ${props => props.selected === true ? corRoxa : "#AD8CA7"};
    border-radius: 30px;
`

export const ViewImage = styled.View`
    align-items: center;
    margin: 0 0 120px;
`

export const FrameModel = styled.Image`
    width: 330px;
    height: 320px;
`

export const ButtonView = styled.View`
    align-items: center;
`

export const ButtonAdvance = styled.View`
    height: 54px;
    width: 54px;
    background-color: ${corPrimaria};
    border-radius: 50%;
    align-items: center;
    justify-content: center;
`