import React, { useEffect, useState } from "react"
import { styles } from "./style"
import { 
    ScrollView, 
    TouchableOpacity, 
    Image, 
    Text, 
    Alert, 
    Modal, 
    View, 
    ActivityIndicator 
} from "react-native"
import { Feather } from "react-native-vector-icons"
import logo from "../../../assets/logo-parko.png"
import Inputs from "./components/inputs"
import Login from "./components/loginBotao"
import BotaoLogin from "../../Components/LoginSocialMedia"
import api from "../../Services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"

const Register = ({ navigation }) => {

    const [dados, setDados] = useState({
        email: '',
        password: '',
        confirmaSenha: ''
    })

    const alteraDados = (variavel, valor) => {
        setDados({
            ...dados,
            [variavel]: valor
        })
    }

    const [statusError, setStatusError] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    let register = true

    function realizarCadastro() {
        if (dados.email === "" || dados.password === "" || dados.confirmaSenha === "") {
            setStatusError('empty')
            setMensagemErro("preencha o campo vazio")
        } else if (dados.password != dados.confirmaSenha) {
            setStatusError('confirmaSenha')
            setMensagemErro('As senhas não conferem')
        } else {
            registrarUsuario()
        }
    }

    async function registrarUsuario() {
        await api.post("/users", { 
            name_user: "", 
            email: dados.email, 
            password: dados.password,
            cpf: "", 
            rg: "", 
            tel: "", 
            data_nasc: ""
        })
        .then(() => {
            handleLogin()
        })
        .catch(e => {
            setStatusError(true)
            setMensagemErro(e.response.data.message)
            console.log(e.response.data.message)
        })
    }

    async function handleLogin() {
        await api.post("/users/login", {
            email: dados.email,
            password: dados.password
        })
        .then(res => {
            AsyncStorage.setItem("token", JSON.stringify(res.data))
        })
        .then(() => {
            setCarregando(false)
            Alert.alert(
                "Bem-vindo(a)", 
                "Preencha os seus dados para te conhecermos melhor"
            )
            navigation.replace("Profile", { dados, register })
        })
        .catch(e => {
            setCarregando(false)
            setMensagemErro(e.response.data.message)
            console.log("erro ao logar na conta")
            console.log(e.response.data.message)
        })
    }

    return (
        <ScrollView contentContainerStyle={styles.displayTela}>
            <TouchableOpacity 
                style={{ position: "absolute", left: 38, top: 0 }} 
                onPress={() => navigation.goBack()}
            >
                <Feather name="arrow-left" size={32} />
            </TouchableOpacity>
            <Image source={logo} style={styles.imagem} />
            <Inputs
                statusError={statusError}
                setStatusError={setStatusError}
                mensagemErro={mensagemErro}
                error
                messageError
                email={dados.email}
                password={dados.password}
                confirmaSenha={dados.confirmaSenha}
                setEmail={valor => alteraDados('email', valor)}
                setSenha={valor => alteraDados('password', valor)}
                setConfirmaSenha={valor => alteraDados('confirmaSenha', valor)}
                secureTextEntry
            />
            <Login realizarCadastro={realizarCadastro} />
            <Text style={styles.separacao}> ──────────  ou  ──────────</Text>
            <BotaoLogin />

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
    )
}

export default Register;