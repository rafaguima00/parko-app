import React, { useState } from "react"
import { styles } from "./style"
import { 
    TouchableOpacity, 
    Image, 
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Text,
    Linking, 
    View
} from "react-native"
import { Feather } from "react-native-vector-icons"
import logo from "../../../assets/logo-parko.png"
import Inputs from "./components/inputs"
import Login from "./components/loginBotao"
import BotaoLogin from "../../Components/LoginSocialMedia"
import api from "../../Services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import LoadingModal from "../../Components/Loading"
import { useNavigation } from "@react-navigation/native"

const Register = () => {

    const navigation = useNavigation()

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

    const [statusError, setStatusError] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(false)
    const [aceitouTermos, setAceitouTermos] = useState(false)
    const [aceitouPrivacidade, setAceitouPrivacidade] = useState(false)

    let register = true

    function realizarCadastro() {
        setCarregando(true)

        if (!aceitouTermos || !aceitouPrivacidade) {
            setStatusError(true)
            setMensagemErro("É necessário aceitar os termos e a política de privacidade")
            setCarregando(false)
            return
        }

        if (dados.email === "" || dados.password === "" || dados.confirmaSenha === "") {
            setStatusError(true)
            setMensagemErro("Preencha o campo vazio")
            setCarregando(false)
        } else if (dados.password != dados.confirmaSenha) {
            setStatusError(true)
            setMensagemErro('As senhas não conferem')
            setCarregando(false)
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
            setCarregando(false)
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
            navigation.replace("Profile", { register })
        })
        .catch(e => {
            setCarregando(false)
            setStatusError(true)
            setMensagemErro(e.response.data.message)
        })
        .finally(() => {
            setCarregando(false)
        })
    }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : undefined}
        >
            <ScrollView 
                contentContainerStyle={styles.displayTela}
            >
                <TouchableOpacity 
                    style={{ position: "absolute", left: 38, top: 64 }} 
                    onPress={() => navigation.goBack()}
                >
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <Image 
                    source={logo} 
                    style={styles.imagem} 
                    resizeMode="contain"
                />
                <Inputs
                    statusError={statusError}
                    setStatusError={setStatusError}
                    mensagemErro={mensagemErro}
                    email={dados.email}
                    password={dados.password}
                    confirmaSenha={dados.confirmaSenha}
                    setEmail={valor => alteraDados('email', valor)}
                    setSenha={valor => alteraDados('password', valor)}
                    setConfirmaSenha={valor => alteraDados('confirmaSenha', valor)}
                    secureTextEntry
                />
                <View
                    style={{ flexDirection: "column", gap: 12 }}
                >
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => setAceitouTermos(!aceitouTermos)}
                        activeOpacity={0.9}
                    >
                        <View 
                            style={{
                                height: 22,
                                width: 22,
                                borderWidth: 1,
                                borderColor: '#555',
                                marginRight: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {aceitouTermos && <Feather name="check" size={22} color="#555" />}
                        </View>
                        <Text>
                            Li e concordo com os{' '} 
                            <Text 
                                style={{ color: '#007BFF', textDecorationLine: 'underline' }}
                                onPress={() => {
                                    const url = 'https://parkoapp-termsofservice.com.br/'
                                    Linking.openURL(url)
                                }}
                            >
                                Termos de Uso
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                        onPress={() => setAceitouPrivacidade(!aceitouPrivacidade)}
                        activeOpacity={0.9}
                    >
                        <View 
                            style={{
                                height: 22,
                                width: 22,
                                borderWidth: 1,
                                borderColor: '#555',
                                marginRight: 10,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {aceitouPrivacidade && <Feather name="check" size={22} color="#555" />}
                        </View>
                        <Text>
                            Li e concordo com a{' '}
                            <Text 
                                style={{ color: '#007BFF', textDecorationLine: 'underline' }}
                                onPress={() => {
                                    const url = 'https://parkoapp-privacypolicy.com.br/'
                                    Linking.openURL(url)
                                }}
                            >
                                Política de Privacidade
                            </Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Login realizarCadastro={realizarCadastro} />
                {/* <Text style={styles.separacao}> ──────────  ou  ──────────</Text>
                <BotaoLogin /> */}
                <LoadingModal loading={carregando} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default Register