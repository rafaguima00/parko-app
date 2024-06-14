import React, { useEffect, useState } from "react"
import {
    Image,
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Modal,
    ActivityIndicator,
    Alert
} from "react-native"
import { Octicons, Feather } from "react-native-vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"
import IconeEditarPerfil from "../../Components/IconEdit"
import fotoPerfil from "../../../assets/user-2.png"
import { theme } from '../../Theme'
import { Botao } from "../../Components/Botao"
import { TextInputMask } from 'react-native-masked-text'
import { styles } from "./style"
import api from "../../Services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../../Context/dataUserContext"
import { jwtDecode } from "jwt-decode"

export default function Profile({ navigation, route }) {

    const { corVermelha, corPrimaria } = theme

    const [carregando, setCarregando] = useState(false)
    const [dados, setDados] = useState({})

    const { dataUser, setDataUser } = useUser()
    const { email, password, name, sobrenome, cpf, tel, register } = route.params

    function sobreNome() {
        const segundoNome = name.split(' ')
        setDados({ ...dados, sobrenome: segundoNome[1] })
        
        if(dados.sobrenome) {
            carregarDados("name", segundoNome[0])
        }
    }

    function carregarDados(variavel, valor) {
        setDados({ ...dados, [variavel]: valor })
    }

    function salvarDados() {

        if (
            dados.name === '' ||
            dados.tel === '' ||
            dados.cpf === ''
        ) {
            Alert.alert('Aviso', 'Preencha os campos vazios')
        } else {
            Alert.alert(
                '',
                'Deseja salvar os dados?',
                [
                    {
                        text: 'Sim',
                        onPress: () => criarUsuario(dataUser.id)
                    },
                    {
                        text: 'Não'
                    }
                ]
            )
        }
    }

    async function criarUsuario(id) {
        setCarregando(true)

        await api.put(`/users/${id}`, { 
            name: `${dados.name} ${dados.sobrenome}`, 
            cpf: dados.cpf,
            tel: dados.tel
        })
        .then(() => {
            if(register) Alert.alert(`Bem-vindo(a) ${dados.name}!`)
            navigation.navigate("Map")
        })
        .catch(e => {
            setCarregando(false)
            Alert.alert(e.response.data.message)
        })
    }

    const alertWarning = (id) => {
        Alert.alert(
            "Desativar conta",
            "Você tem certeza que deseja desativar sua conta? Você irá perder todos os dados do seu cartão de crédito, veículos... tudo que você tem direito",
            [
                {
                    text: 'Sim',
                    onPress: () => deleteAccount(id)
                },
                {
                    text: 'Não'
                }
            ]
        )
    }

    const deleteAccount = async (id) => {
        await api.delete(`/users/${id}`)
        .then(() => {
            Alert.alert("Sua conta foi desativada")
            navigation.replace("Login")
        })
        .catch(e => {
            Alert.alert("Erro ao deletar conta", e.message)
        })
    }

    useEffect(() => {
        if(name) {
            sobreNome()
        }

        (async () => {
            const token = await AsyncStorage.getItem("token")
    
            if(register) {
                const decode = jwtDecode(token)
                setDataUser(decode.user)
            } else {
                setDados(dataUser)
            }
        }
        )()
    }, [])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    <TouchableOpacity
                        onPress={salvarDados}
                        style={{ marginHorizontal: 36, marginTop: 38 }}
                        activeOpacity={0.9}
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
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.name || name}
                            onChangeText={text => setDados({ ...dados, name: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Sobrenome</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Digite seu sobrenome"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.sobrenome || sobrenome}
                            onChangeText={text => setDados({ ...dados, sobrenome: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Telefone</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInputMask
                            type='cel-phone'
                            placeholder="Digite o número do celular"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.tel || tel}
                            onChangeText={text => setDados({ ...dados, tel: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>E-mail</Text>
                    <TouchableOpacity disabled style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Email"
                            placeholderTextColor={corPrimaria}
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
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={password}
                            secureTextEntry
                            maxLength={12}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>CPF</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInputMask
                            type='cpf'
                            placeholder="Digite seu CPF"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.cpf || cpf}
                            onChangeText={text => setDados({ ...dados, cpf: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>
                    <Botao
                        children={"Desativar conta"}
                        corDeFundo={corVermelha}
                        negrito
                        corDoTexto={'#fff'}
                        aoPressionar={() => alertWarning(dataUser.id)}
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