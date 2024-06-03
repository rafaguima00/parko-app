import React, { useEffect, useState } from "react"
import {
    Image,
    Text,
    SafeAreaView
} from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import logo from '../../../assets/logo-parko.png'
import { styles } from "./style"
import InputLogin from "./components/inputLogin"
import BotaoLoginCadastro from "./components/loginCadastro"
import BotaoLogin from "../../Components/LoginSocialMedia"

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

    const [statusError, setStatusError] = useState('')
    const [mensagemErro, setMensagemErro] = useState('')

    async function realizarLogin() {
        if (dados.email === '') {
            setMensagemErro('O e-mail é obrigatório')
            setStatusError('email')
        } else if (dados.senha === '') {
            setMensagemErro('A senha é obrigatória')
            setStatusError('senha')
        } else {
            navigation.replace('Map')
        }
    }

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
        </SafeAreaView>
    )
}

export default Login;