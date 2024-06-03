import React, { useState } from "react"
import { 
    SafeAreaView,
    Text, 
    View, 
    TouchableOpacity, 
    Image, 
    KeyboardAvoidingView, 
    Platform 
} from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { Feather } from "react-native-vector-icons"
import { theme } from "../../Theme"
import { Botao } from "../../Components/Botao"
import { TextInputMask } from 'react-native-masked-text'
import { styles } from "./style"

const { corPrimaria } = theme;

export default function RegisterCard({ navigation }) {

    const [dados, setDados] = useState({
        nome: '',
        numCartao: '',
        dateTime: '',
        cvc: ''
    })

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    async function adicionarCartao() {
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
            console.log("cartão adicionado")
        }
    }

    return (
        <SafeAreaView style={styles.areaContent}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView>
                    <View style={styles.container}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Feather name="arrow-left" size={32} />
                        </TouchableOpacity>
                        <Text style={styles.addCard}>Adicionar cartão</Text>
                    </View>
                    <View style={{ alignItems: 'center', marginVertical: 42 }}>
                        <View style={styles.viewCard}>
                            <View style={{ gap: 12, justifyContent: 'flex-start' }}>
                                <Text style={styles.dadosCard}>{dados.nome}</Text>
                                <Text style={styles.dadosCard}>{dados.numCartao}</Text>
                                <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                                    <Text style={[styles.dadosCard, { fontSize: 15 }]}>{dados.dateTime}</Text>
                                    <Text style={[styles.dadosCard, { fontSize: 15 }]}>{dados.cvc}</Text>
                                </View>
                            </View>
                            <Image source={{}} style={{ width: 54, height: 34 }} />
                        </View>
                    </View>
                    <View style={styles.formCard}>
                        <TextInput
                            autoCapitalize="words"
                            placeholder="Nome Completo"
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
                        </View> : ""}
                    <Botao
                        estilo={{ marginHorizontal: 32 }}
                        children={'Adicionar'}
                        corDeFundo={corPrimaria}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={adicionarCartao}
                    />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}