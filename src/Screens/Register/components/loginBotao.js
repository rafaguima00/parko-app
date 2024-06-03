import React from "react"
import { View, TouchableOpacity, Text } from 'react-native'
import { styles } from "../style"

const Login = ({ realizarCadastro }) => {
    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.botao} onPress={realizarCadastro}>
                <Text style={styles.textoBotao}>Cadastrar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Login;