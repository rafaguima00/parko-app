import styled from "styled-components"
import { StyleSheet } from "react-native"

export const CardForm = styled.View`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 12px;
    margin-bottom: 48px;
`

export const FlexCVC = styled.View`
    display: flex;
    flex-direction: row;
    gap: 50px;
`

export const styles = StyleSheet.create({
    input: {
        width: 332,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D",
    },

    inputInferior: {
        width: 140,
        height: 40,
        borderBottomWidth: 2,
        borderColor: "#7D7D7D"
    },
})