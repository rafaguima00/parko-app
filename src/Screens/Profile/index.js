import React, { useEffect, useState } from "react"
import {
    Image,
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert
} from "react-native"
import { DivButton } from "./style"
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
import LoadingModal from "../../Components/Loading"

export default function Profile({ navigation, route }) {

    const { corVermelha, corPrimaria } = theme

    const [carregando, setCarregando] = useState(false)
    const [dados, setDados] = useState({})

    const { dataUser, setDataUser } = useUser()
    const { name } = dataUser
    const { register } = route.params

    function sobreNome() {
        const segundoNome = name.split(' ')
        
        carregarDados("name", segundoNome[0])

        if(segundoNome.length > 1) {
            carregarDados("sobrenome", segundoNome[1])
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
            return Alert.alert('Aviso', 'Preencha os campos vazios')
        } 

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

    async function criarUsuario(id) {
        setCarregando(true)

        await api.put(`/users/${id}`, { 
            name: `${dados.name} ${dados.sobrenome}`, 
            cpf: dados.cpf,
            tel: dados.tel
        })
        .then(() => {
            if(register) Alert.alert(`Bem-vindo(a) ${dados.name}!`)
            navigation.replace("Map")
        })
        .catch(e => {
            Alert.alert(e.response.data.message)
        })
        .finally(() => {
            setCarregando(false)
        })
    }

    const alertWarning = (id) => {
        Alert.alert(
            "Desativar conta",
            "Você tem certeza que deseja desativar sua conta? Esta ação excluirá todos os seus dados.",
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
        setCarregando(true)

        await api.delete(`/users/${id}`)
        .then(() => {
            Alert.alert("Sua conta foi desativada")
            navigation.replace("Login")
        })
        .catch(e => {
            Alert.alert("Erro ao deletar conta", e.message)
        })
        .finally(() => {
            setCarregando(false)
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
                        onPress={() => navigation.replace("Map")}
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
                            value={dados.name}
                            onChangeText={text => carregarDados("name", text)}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Sobrenome</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInput
                            placeholder="Digite seu sobrenome"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.sobrenome}
                            onChangeText={text => carregarDados("sobrenome", text)}
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
                            value={dados.tel}
                            onChangeText={text => carregarDados("tel", text)}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    {/* <Text style={styles.nome}>E-mail</Text>
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
                    </TouchableOpacity> */}

                    <Text style={styles.nome}>CPF</Text>
                    <TouchableOpacity style={styles.displayUsuario}>
                        <TextInputMask
                            type='cpf'
                            placeholder="Digite seu CPF"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={dados.cpf}
                            onChangeText={text => carregarDados("cpf", text)}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>
                    <DivButton>
                        <Botao
                            children={"Desativar conta"}
                            corDeFundo={corVermelha}
                            negrito
                            corDoTexto={'#fff'}
                            aoPressionar={() => alertWarning(dataUser.id)}
                        />
                        <Botao
                            children={"Salvar"}
                            corDeFundo={corPrimaria}
                            negrito
                            corDoTexto={'#fff'}
                            aoPressionar={salvarDados}
                        />
                    </DivButton>
                </View>
                <LoadingModal loading={carregando} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
    
}