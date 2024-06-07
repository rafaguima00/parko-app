import React, { useEffect, useState } from "react"
import { styles } from "./style"
import { ScrollView, TouchableOpacity, Image, Text } from "react-native"
import { Feather } from "react-native-vector-icons"
import logo from "../../../assets/logo-parko.png"
import Inputs from "./components/inputs"
import Login from "./components/loginBotao"
import BotaoLogin from "../../Components/LoginSocialMedia"

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

    function realizarCadastro() {
        if (dados.email === "" || dados.password === "" || dados.confirmaSenha === "") {
            setStatusError('empty')
            setMensagemErro("preencha o campo vazio")
        } else if (dados.password != dados.confirmaSenha) {
            setStatusError('confirmaSenha')
            setMensagemErro('As senhas não conferem')
        } else {
            navigation.navigate("Profile", dados)
        }
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
        </ScrollView>
    )
}

export default Register;