import { TextInputMask } from 'react-native-masked-text'
import { TextInput, Text, Alert, View } from 'react-native'
import { CardForm, FlexCVC, styles } from './style'
import { usePayment } from '../../Context/paymentContext'
import { theme } from '../../Theme'
import { useState } from 'react'
import LoadingModal from '../Loading'
import { Botao } from '../Botao'
import axios from 'axios'
import { useUser } from '../../Context/dataUserContext'
import { PUBLIC_KEY, ACCESS_TOKEN } from "@env"

const FormCard = () => {

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [loading, setLoading] = useState(false)

    const { cardData, setCardData, setCard, card } = usePayment()
    const { dataUser } = useUser()

    const { corPrimaria } = theme

    async function adicionarCartao() {
        setLoading(true)

        if (
            cardData.name === "" || 
            cardData.card_number === "" || 
            cardData.date_time === "" || 
            cardData.cvc === "" ||
            cardData.cpf === ""
        ) {
            setErro(true)
            setMensagemErro("Preencha todos os campos")
            setLoading(false)
            return
        }

        await axios.post(
            `https://api.mercadopago.com/v1/card_tokens?public_key=${PUBLIC_KEY}`,
            {
                card_number: cardData.card_number.replace(/\s/g, ''),
                cardholder: {
                    name: cardData.name,
                    identification: {
                        type: "CPF",
                        number: cardData.cpf.replace(/\D/g, ''), 
                    }
                },
                expiration_month: cardData.date_time.split('/')[0],
                expiration_year: `20${cardData.date_time.split('/')[1]}`,
                security_code: cardData.cvc
            }
        )
        .then(res => {
            saveCardForUser(dataUser.email, res.data.id)
        })
        .catch(e => {
            setErro(true)
            setMensagemErro("Erro ao salvar cartão")
            setLoading(false)
            console.log(e)
        })
    }

    const createCustomer = async (email) => {
        try {
            const searchResponse = await axios.get(
                `https://api.mercadopago.com/v1/customers/search?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )
        
            const existingCustomer = searchResponse.data.results[0]
        
            if (existingCustomer) {
                return existingCustomer
            }

            const response = await axios.post(
                'https://api.mercadopago.com/v1/customers',
                {
                    email: email, 
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )

            return response.data
        } catch (error) {
            console.error('Erro ao criar cliente:', error.response?.data || error.message)
        }
    }

    const saveCard = async (customerId, cardToken) => {
        try {
            const response = await axios.post(
                `https://api.mercadopago.com/v1/customers/${customerId}/cards`,
                {
                    token: cardToken
                },
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )

            return response.data
        } catch (error) {
            console.error('Erro ao salvar cartão:', error.response?.data || error.message)
        } finally {
            setCardData({
                name: "",
                card_number: "",
                date_time: "",
                cvc: "",
                cpf: ""
            })
        }
    }

    const saveCardForUser = async (email, cardToken) => {
        try {
            // Criar cliente (se não existir)
            const customer = await createCustomer(email)
        
            // Salvar o cartão associado ao cliente
            const newCard = await saveCard(customer.id, cardToken)

            setCard([ ...card, newCard ])
            Alert.alert('Cartão salvo com sucesso')

            return newCard
        } catch (error) {
            Alert.alert('Erro ao salvar o cartão para o cliente', error)
        } finally {
            setLoading(false)
        }
    }

    return <>
        <CardForm>
            <TextInput
                autoCapitalize="words"
                placeholder="Nome Completo (conforme aparece no cartão)"
                style={styles.input}
                value={cardData.name}
                onChangeText={text => setCardData({ ...cardData, name: text })}
            />
            <TextInputMask
                placeholder="Número do cartão"
                maxLength={19}
                type='credit-card'
                value={cardData.card_number}
                onChangeText={text => setCardData({ ...cardData, card_number: text })}
                style={styles.input}
            />
            <FlexCVC>
                <TextInputMask
                    placeholder="Validade (MM/YY)"
                    type='datetime'
                    value={cardData.date_time}
                    onChangeText={text => setCardData({ ...cardData, date_time: text })}
                    style={styles.inputInferior}
                    maxLength={5}
                />
                <TextInputMask
                    placeholder="CVC"
                    style={styles.inputInferior}
                    type='custom'
                    options={{
                        mask: '9999'
                    }}
                    value={cardData.cvc}
                    onChangeText={text => setCardData({ ...cardData, cvc: text })}
                />
            </FlexCVC>
            <TextInputMask
                placeholder="CPF do titular"
                type='cpf'
                value={cardData.cpf}
                onChangeText={text => setCardData({ ...cardData, cpf: text })}
                style={styles.input}
            />
        </CardForm>
        {erro ?
        <View style={{marginVertical: 7}}>
            <Text style={{ color: 'red', textAlign: 'center' }}>{mensagemErro}</Text>
        </View> : ""
        }
        <Botao
            estilo={{ marginHorizontal: 32 }}
            children={'Adicionar'}
            corDeFundo={corPrimaria}
            corDoTexto={'#fff'}
            negrito
            aoPressionar={adicionarCartao}
        />
        <LoadingModal loading={loading} />
    </>
}

export default FormCard