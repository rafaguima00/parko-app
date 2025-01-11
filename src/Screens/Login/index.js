import React, { useEffect, useState } from "react"
import {
    Image,
    Text,
    SafeAreaView,
    Modal, 
    ActivityIndicator,
    View
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import logo from '../../../assets/logo-parko.png'
import { styles } from "./style"
import InputLogin from "./components/inputLogin"
import BotaoLoginCadastro from "./components/loginCadastro"
import BotaoLogin from "../../Components/LoginSocialMedia"
import AsyncStorage from "@react-native-async-storage/async-storage"
import api from "../../Services/api"
import LoadingModal from "../../Components/Loading"

const Login = () => {
    
    const navigation = useNavigation()

    const [dados, setDados] = useState({
        email: '',
        senha: ''
    })

    const alteraDados = (variavel, valor) => {
        setDados({
            ...dados,
            [variavel]: valor
        })
    }

    const [statusError, setStatusError] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(true)

    const handleLogin = async () => {
        setCarregando(true)

        await api.post("/users/login", {
            email: dados.email,
            password: dados.senha
        })
        .then(res => {
            AsyncStorage.setItem("token", JSON.stringify(res.data.token))
        })
        .then(() => {
            navigation.replace("Map")
        })
        .catch(e => {
            setStatusError(true)
            setMensagemErro(e.response.data.message)
        })
        .finally(() => {
            setCarregando(false)
        })
    }

    function realizarLogin() {
        if (dados.email === '') {
            setStatusError(true)
            setMensagemErro('O e-mail é obrigatório')
        } else if (dados.senha === '') {
            setStatusError(true)
            setMensagemErro('A senha é obrigatória')
        } else {
            handleLogin()
        }
    }

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem("token")
            if (token) {
                navigation.replace("Map")
            }

            setCarregando(false)
        }
        checkLogin()
    }, [navigation])

    return (
        <SafeAreaView style={styles.displayTela} >
            <Image source={logo} style={styles.imagem} />
            <InputLogin
                statusError={statusError}
                setStatusError={setStatusError}
                mensagemErro={mensagemErro}
                email={dados.email}
                senha={dados.senha}
                setEmail={valor => alteraDados('email', valor)}
                setSenha={valor => alteraDados('senha', valor)}
                secureTextEntry
            />
            <BotaoLoginCadastro realizarLogin={realizarLogin} />
            <TouchableOpacity activeOpacity={0.5}>
                <Text style={styles.esqueciASenha}>Esqueci a senha</Text>
            </TouchableOpacity>
            {/* 
                <Text style={styles.separacao}> ──────────  ou  ────────── </Text>
                <BotaoLogin /> 
            */}
            <LoadingModal loading={carregando} />
        </SafeAreaView>
    )
}

export default Login