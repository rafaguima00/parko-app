import { TextInputMask } from 'react-native-masked-text'
import { TextInput, Text, Alert, View } from 'react-native'
import { CardForm, FlexCVC, styles } from './style'
import { usePayment } from '../../Context/paymentContext'
import { theme } from '../../Theme'
import { useEffect, useState } from 'react'
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

        // Validação dos campos
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

        // Validação de formato dos dados
        if (!/^\d{15,16}$/.test(cardData.card_number.replace(/\s/g, ''))) {
            setErro(true)
            setMensagemErro("Número do cartão inválido")
            setLoading(false)
            return
        }

        if (!/^\d{2}\/\d{2}$/.test(cardData.date_time)) {
            setErro(true)
            setMensagemErro("Data de validade inválida")
            setLoading(false)
            return
        }

        if (!/^\d{3,4}$/.test(cardData.cvc)) {
            setErro(true)
            setMensagemErro("Código de segurança inválido")
            setLoading(false)
            return
        }

        if (!/^\d{11}$/.test(cardData.cpf.replace(/\D/g, ''))) {
            setErro(true)
            setMensagemErro("CPF inválido")
            setLoading(false)
            return
        }

        // Criação do token do cartão
        try {
            const response = await axios.post(
                `https://api.mercadopago.com/v1/card_tokens?public_key=${PUBLIC_KEY}`,
                {
                    card_number: cardData.card_number.replace(/\s/g, ''),
                    cardholder_name: cardData.name,
                    doc_type: 'CPF',
                    doc_number: cardData.cpf.replace(/\D/g, ''),
                    expiration_month: cardData.date_time.split('/')[0],
                    expiration_year: `20${cardData.date_time.split('/')[1]}`,
                    security_code: cardData.cvc
                }
            )

            // Se deu tudo certo, salva o token
            saveCardForUser(dataUser.email, response.data.id)
            setErro(false)
            setMensagemErro("")
        } catch (e) {
            setErro(true)

            if (e.response && e.response.data && e.response.data.message) {
                setMensagemErro(e.response.data.message)
            } else if (e.message === 'Network Error') {
                setMensagemErro("Sem conexão com o servidor")
            } else {
                setMensagemErro("Erro ao salvar cartão")
            }

            console.log('Erro ao criar token:', e.response ? e.response.data : e)
        } finally {
            setLoading(false)
        }
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
            const customerCards = searchResponse.data.results[0].cards

            if(customerCards.length == 2) {
                Alert.alert("Aviso", "O cliente só pode adicionar no máximo 2 cartões provisoriamente")
                setCardData({
                    name: "",
                    card_number: "",
                    date_time: "",
                    cvc: "",
                    cpf: ""
                })
                return
            }
        
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
            Alert.alert('Erro ao criar cliente:', error.message)
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
            console.log('Erro ao salvar cartão')
        }
    }

    const saveCardForUser = async (email, cardToken) => {
        try {
            // Criar cliente (se não existir)
            const customer = await createCustomer(email)
        
            // Salvar o cartão associado ao cliente
            const newCard = await saveCard(customer.id, cardToken)


            if(newCard !== undefined) {
                setCard([ ...card, newCard ])
                setCardData({
                    name: "",
                    card_number: "",
                    date_time: "",
                    cvc: "",
                    cpf: ""
                })

                Alert.alert("Cartão salvo com sucesso")
                
                return newCard
            } else {
                Alert.alert("Erro", "Verifique se você digitou algum dado incorreto do cartão")
            }
        } catch (error) {
            Alert.alert("Erro ao salvar o cartão para o cliente", error.message)
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