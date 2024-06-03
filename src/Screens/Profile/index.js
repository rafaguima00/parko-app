import React, { useState, useContext } from "react"
import {
    Image,
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator
} from "react-native"
import { Octicons, Feather } from "react-native-vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import IconeEditarPerfil from "../../Components/IconEdit"
import fotoPerfil from "../../../assets/user-2.png"
import { theme } from '../../Theme'
import { Botao } from "../../Components/Botao"
import { TextInputMask } from 'react-native-masked-text'
import { Alert } from "react-native"
import { DataUserContext } from "../../Context/dataUserContext" 
import { styles } from "./style"

const { corVermelha } = theme

export default function Profile({ navigation }) {
    const [carregando, setCarregando] = useState(false)

    const { dados, setDados } = useContext(DataUserContext)
    const { nome, numero, sobrenome, cpf, email } = dados;

    function salvarDados() {
        if (
            nome === '' ||
            sobrenome === '' ||
            numero === '' ||
            cpf === ''
        ) {
            Alert.alert('Aviso', 'Preencha os campos vazios')
        } else {
            Alert.alert(
                '',
                'Deseja salvar os dados?',
                [
                    {
                        text: 'Sim',
                        onPress: () => aoSalvar()
                    },
                    {
                        text: 'Não'
                    }
                ]
            )
        }
    }

    function aoSalvar() {
        setCarregando(true)
        if (dados) {
            setCarregando(false)
            Alert.alert(
                'Salvo com sucesso',
                JSON.stringify(dados)
            )
            navigation.replace('Map')
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    <TouchableOpacity
                        onPress={salvarDados}
                        style={{ marginHorizontal: 36, marginTop: 38 }}
                    >
                        <Feather name="arrow-left" size={36} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Image source={fotoPerfil} style={styles.top} />
                    </View>
                </View>
 
                <View style={styles.perfil}>
                   <TouchableOpacity style={styles.botaoEdit} activeOpacity={0.7} >
                        <Octicons name="pencil" size={32} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.nome}>Nome</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor="#0097B9"
                            style={styles.dadosUsuario}
                            value={nome}
                            onChangeText={text => setDados({ ...dados, nome: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Sobrenome</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Digite seu sobrenome"
                            placeholderTextColor='#0097B9'
                            style={styles.dadosUsuario}
                            value={sobrenome}
                            onChangeText={text => setDados({ ...dados, sobrenome: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Telefone</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInputMask
                            type='cel-phone'
                            placeholder="Digite o número do celular"
                            placeholderTextColor='#0097B9'
                            style={styles.dadosUsuario}
                            value={numero}
                            onChangeText={text => setDados({ ...dados, numero: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>E-mail</Text>
                    <TouchableOpacity disabled style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor='#0097B9'
                            style={styles.dadosUsuario}
                            value={email}
                            editable={false}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Senha</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Senha"
                            placeholderTextColor='#0097B9'
                            style={styles.dadosUsuario}
                            value={""}
                            secureTextEntry
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>CPF</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInputMask
                            type='cpf'
                            placeholder="Digite seu CPF"
                            placeholderTextColor='#0097B9'
                            style={styles.dadosUsuario}
                            value={cpf}
                            onChangeText={text => setDados({ ...dados, cpf: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>
                    <Botao
                        children={"Desativar conta"}
                        corDeFundo={corVermelha}
                        negrito
                        corDoTexto={'#fff'}
                        disabled
                    />
                </View>
                <Modal
                    visible={carregando}
                    transparent={true}
                    onRequestClose={() => { }}
                    animationType='fade'
                >
                    <View
                        style={{
                            backgroundColor: 'rgba(125, 125, 125, 0.6)',
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        <ActivityIndicator size={'small'} color={'#fff'} />
                    </View>
                </Modal> 
            </ScrollView>
        </KeyboardAvoidingView>
    )
}