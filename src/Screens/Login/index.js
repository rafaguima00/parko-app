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

const Login = () => {
    const navigation = useNavigation()
    const token = AsyncStorage.getItem("token")

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

    const [statusError, setStatusError] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    const handleLogin = async () => {
        setCarregando(true)

        await api.post("/users/login", {
            email: dados.email,
            password: dados.senha
        })
        .then(res => {
            AsyncStorage.setItem("token", JSON.stringify(res.data))
        })
        .then(() => {
            setCarregando(false)
            navigation.replace("Map")
        })
        .catch(e => {
            setCarregando(false)
            setStatusError("no-user")
            setMensagemErro(e.response.data.message)
        })
    }

    function realizarLogin() {
        if (dados.email === '') {
            setMensagemErro('O e-mail é obrigatório')
            setStatusError('email')
        } else if (dados.senha === '') {
            setMensagemErro('A senha é obrigatória')
            setStatusError('senha')
        } else {
            handleLogin()
        }
    }

    // useEffect(() => {
    //     if(token) {
    //         return navigation.replace("Map")
    //     }
    // }, [navigation, token])

    return (
        <SafeAreaView style={styles.displayTela} >
            <Image source={logo} style={styles.imagem} />
            <InputLogin
                error
                messageError
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
            <Text style={styles.separacao}> ──────────  ou  ────────── </Text>
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
        </SafeAreaView>
    )
}

export default Login;