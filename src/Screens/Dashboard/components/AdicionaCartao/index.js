import React, { useState } from "react"
import { View, Text, Image, TextInput, KeyboardAvoidingView, ScrollView, Platform } from "react-native"
import { Botao } from "../../../../Components/Botao"
import { styles, TituloPrincipal, TopModal, ViewCard, VoltarTelaAnterior } from "../../style"
import { theme } from "../../../../Theme"
import { TextInputMask } from "react-native-masked-text"
import { Feather } from "react-native-vector-icons"

const { corPrimaria } = theme

const AdicionaCartao = (props) => {

    const { setAddCartao, setPagamento } = props.states
    const { voltar } = props

    const [dados, setDados] = useState({
        nome: '',
        numCartao: '',
        dateTime: '',
        cvc: ''
    })
    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    function adicionarCartao() {
        if (dados.nome == "" || dados.numCartao == "" || dados.dateTime == "" || dados.cvc === "") {
            setErro(true)
            setMensagemErro("Preencha todos os campos")
        } else if (dados.numCartao.length != 19) {
            setErro(true)
            setMensagemErro("Número do cartão inválido")
        } else if (dados.dateTime.length != 5) {
            setErro(true)
            setMensagemErro("Data de validade do cartão inválida")
        } else {
            setErro(false)
            setAddCartao(false)
            setPagamento(true)
            alert("Cartão adicionado")
        }
    }

    return <>
        <View style={[styles.dashContent, styles.escolher]}>
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Adicionar Cartão</TituloPrincipal>
            </TopModal>
            <ViewCard>
                <Image
                    source={require('../../../../../assets/image-card.png')}
                    style={styles.imagemCartao}
                />
            </ViewCard>
            <View style={styles.formAddCard}>
                <TextInput
                    autoCapitalize="words"
                    placeholder="Nome Completo (conforme aparece no cartão)"
                    placeholderTextColor={'#7d7d7d'}
                    style={styles.input}
                    value={dados.nome}
                    onChangeText={text => setDados({ ...dados, nome: text })}
                />
                <TextInputMask
                    placeholder="Número do cartão"
                    maxLength={19}
                    type='credit-card'
                    value={dados.numCartao}
                    onChangeText={text => setDados({ ...dados, numCartao: text })}
                    style={styles.input}
                />
                <View style={styles.flexCvc}>
                <TextInputMask
                    placeholder="Data de validade"
                    type='datetime'
                    value={dados.dateTime}
                    onChangeText={text => setDados({ ...dados, dateTime: text })}
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
                    value={dados.cvc}
                    onChangeText={text => setDados({ ...dados, cvc: text })}
                />
                </View>
            </View>
            {erro ?
            <View style={{marginVertical: 7}}>
                <Text style={{ color: 'red', textAlign: 'center' }}>{mensagemErro}</Text>
            </View> : ""
            }
            <Botao
                children={"Confirmar"}
                corDeFundo={corPrimaria}
                largura={'100%'}
                corDoTexto={'#fff'}
                negrito
                aoPressionar={adicionarCartao}
            />
        </View>  
    </>
}

export default AdicionaCartao