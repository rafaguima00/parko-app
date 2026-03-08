import { usePayment } from "../../../../../Context/paymentContext"
import { BotaoFechar, BotaoSalvar, TextBotao, AreaView, CampoDeTexto, Header, MsgConfirmacao } from "../style"
import { TextInput } from "react-native-paper"
import { theme } from "../../../../../Theme"
import { useContext, useEffect, useState } from "react"
import { ReservaContext } from "../../../../../Context/reservaContext"
import { PUBLIC_KEY, ACCESS_TOKEN } from "@env"
import axios from "axios"
import { Feather } from "react-native-vector-icons"
import { TouchableOpacity } from "react-native"

const InsertCvv = (props) => {

    const [error, setError] = useState(false)
    const [msgError, setMsgError] = useState("")

    const { corPrimaria, corVermelha } = theme
    const { setPagamento, setModalConfirma, total } = props
    const { setModalCvv } = props.states
    const { cvv, setCvv, setTokenCard, cartaoSelecionado, tokenCard } = usePayment()
    const { itemPreSelecionado, setItemPreSelecionado } = useContext(ReservaContext)

    async function confirmar(card_id) {
        if(cvv === "") {
            setError(true)
            setMsgError("Insira o código CVV do seu cartão")
            return
        }

        if (!/^\d{3,4}$/.test(cvv)) {
            setError(true)
            setMsgError("Código de segurança inválido")
            return
        }

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
            console.log("Erro ao gerar token do cartão:", error.response?.data || error.message)
            throw new Error("Não foi possível gerar o token do cartão.")
        }
    }

    useEffect(() => {
        if(tokenCard !== "") {
            setCvv("")
            setError(false)
            setMsgError("")
            setItemPreSelecionado({ ...itemPreSelecionado, value: total })
            setModalCvv(false)
            setPagamento(false)
            setModalConfirma(true)
        }
    }, [tokenCard])

    return <>
        <AreaView>
            <BotaoFechar>
                <TouchableOpacity
                    onPress={() => setModalCvv(false)}
                    activeOpacity={0.7}
                >
                    <Feather name="x" color="#fff" size={30} />
                </TouchableOpacity>
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
                    {error && <MsgConfirmacao textcolor={corVermelha}>{msgError}</MsgConfirmacao>}
                </Header>
            </CampoDeTexto>

            <BotaoSalvar onPress={() => confirmar(cartaoSelecionado.id)}>
                <TextBotao>Salvar</TextBotao>
            </BotaoSalvar>
        </AreaView>
    </>
}

export default InsertCvv