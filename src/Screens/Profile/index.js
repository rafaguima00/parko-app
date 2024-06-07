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
import ReadApi from "../../Services/readData"
import { useUser } from "../../Context/dataUserContext"

export default function Profile({ navigation, route }) {

    const { corVermelha, corPrimaria } = theme

    const [carregando, setCarregando] = useState(false)
    const [dados, setDados] = useState({})

    const { loadUsers } = ReadApi()
    const { email, password, name, sobrenome, cpf, tel } = route.params
    const token = AsyncStorage.getItem("token")

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
            dados.name == '' ||
            dados.tel == '' ||
            dados.cpf == ''
        ) {
            Alert.alert('Aviso', 'Preencha os campos vazios')
        } else {
            Alert.alert(
                '',
                'Deseja salvar os dados?',
                [
                    {
                        text: 'Sim',
                        onPress: () => criarUsuario(email)
                    },
                    {
                        text: 'Não'
                    }
                ]
            )
        }
    }

    async function criarUsuario() {
        setCarregando(true)

        if(token) {
            setCarregando(false)
            return navigation.navigate('Map')
        }

        await api.post("/users", { 
            name_user: `${dados.name} ${dados.sobrenome}`, 
            email: email, 
            password: password,
            cpf: dados.cpf, 
            rg: "", 
            tel: dados.tel, 
            data_nasc: ""
        })
        .then(() => {
            handleLogin()
        })
        .catch(e => {
            setCarregando(false)
            Alert.alert(e)
        })
    }

    async function handleLogin() {
        await api.post("/users/login", {
            email: email,
            password: password
        })
        .then(res => {
            AsyncStorage.setItem("token", JSON.stringify(res.data))
        })
        .then(() => {
            setCarregando(false)
            alert(`Seja bem-vindo(a) ${dados.name}!`)
            navigation.replace("Map")
        })
        .catch(e => {
            setCarregando(false)
            console.log(e)
        })
    }

    useEffect(() => {
        if(name) {
            sobreNome()
        }
            
        loadUsers()
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