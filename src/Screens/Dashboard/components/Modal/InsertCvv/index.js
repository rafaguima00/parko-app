import { usePayment } from "../../../../../Context/paymentContext"
import { BotaoFechar, BotaoSalvar, TextBotao, AreaView, CampoDeTexto, Header, MsgConfirmacao } from "../style"
import { TextInput } from "react-native-paper"
import { theme } from "../../../../../Theme"
import { useContext, useEffect, useState } from "react"
import { ReservaContext } from "../../../../../Context/reservaContext"
import { PUBLIC_KEY, ACCESS_TOKEN } from "@env"
import axios from "axios"
import React from "react"

const InsertCvv = (props) => {

    const { corPrimaria } = theme
    const { setPagamento, setModalConfirma, total } = props
    const { setModalCvv } = props.states
    const { cvv, setCvv, setTokenCard, cartaoSelecionado, tokenCard } = usePayment()
    const { itemPreSelecionado, setItemPreSelecionado } = useContext(ReservaContext)

    async function confirmar(card_id) {
        try {
            const response = await axios.post(
                `https://api.mercadopago.com/v1/card_tokens?public_key=${PUBLIC_KEY}`,
                { 
                    card_id,
                    security_code: cvv
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )
            
            setTokenCard(response.data.id)
        } catch (error) {
            console.error("Erro ao gerar token do cartão:", error.response?.data || error.message)
            throw new Error("Não foi possível gerar o token do cartão.")
        }
    }

    useEffect(() => {
        if(tokenCard !== "") {
            setCvv("")
            setItemPreSelecionado({ ...itemPreSelecionado, value: total })
            setModalCvv(false)
            setPagamento(false)
            setModalConfirma(true)
        }
    }, [tokenCard])

    return <>
        <AreaView>
            <BotaoFechar 
                onPress={() => setModalCvv(false)}
            >
                <TextBotao>X</TextBotao>
            </BotaoFechar>

            <CampoDeTexto>
                <Header>
                    <MsgConfirmacao>Digite o número do código de segurança do seu cartão</MsgConfirmacao>
                    <TextInput 
                        placeholder="CVV"
                        mode="outlined"
                        outlineStyle={{ borderRadius: 50, borderColor: corPrimaria }}
                        value={cvv}
                        onChangeText={text => setCvv(text)}
                    />
                </Header>
            </CampoDeTexto>

            <BotaoSalvar onPress={() => confirmar(cartaoSelecionado.id)}>
                <TextBotao>Salvar</TextBotao>
            </BotaoSalvar>
        </AreaView>
    </>
}

export default InsertCvv