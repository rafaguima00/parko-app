import React, { useState } from 'react'
import { View } from 'react-native'
import { TextInput } from 'react-native-paper'
import Alerta from "../../../Components/SnackBar"
import { styles } from "../style"

const Inputs = ({
    statusError,
    setStatusError,
    mensagemErro,
    email,
    password,
    confirmaSenha,
    setEmail,
    setSenha,
    setConfirmaSenha,
    secureTextEntry
}) => {

    const [secureMode, setSecureMode] = useState(secureTextEntry)
    const [secureMode2, setSecureMode2] = useState(secureTextEntry)

    return (
        <View style={styles.flexInput}>
            <TextInput
                style={styles.input}
                outlineStyle={{ borderRadius: 50, borderWidth: 1, borderColor: "#DCDCDC" }}
                mode="outlined"
                value={email}
                onChangeText={setEmail}
                keyboardType='email-address'
                label={'Email'}
                error={statusError == 'email'}
                activeOutlineColor="#545454"
                autoCapitalize='none'
            />
            <TextInput
                style={styles.input}
                outlineStyle={{ borderRadius: 50, borderColor: 'transparent' }}
                mode="outlined"
                onChangeText={setConfirmaSenha}
                value={confirmaSenha}
                label={'Senha'}
                error={statusError == 'senha'}
                activeOutlineColor="#545454"
                autoCapitalize='none'
                secureTextEntry={secureMode}
                right={
                    secureTextEntry ?
                    <TextInput.Icon
                        icon={secureMode ? 'eye-off' : 'eye'}
                        onPress={() => setSecureMode(!secureMode)}
                    /> : 
                    null
                }
            />
            <TextInput
                style={styles.input}
                outlineStyle={{ borderRadius: 50, borderColor: 'transparent' }}
                mode="outlined"
                onChangeText={setSenha}
                value={password}
                label={'Confirmar senha'}
                error={statusError == 'confirmaSenha'}
                activeOutlineColor="#545454"
                autoCapitalize='none'
                secureTextEntry={secureMode2}
                right={
                    secureTextEntry ?
                    <TextInput.Icon
                        icon={secureMode2 ? 'eye-off' : 'eye'}
                        onPress={() => setSecureMode2(!secureMode2)}
                    /> : 
                    null
                }
            />
            <Alerta 
                message={mensagemErro}
                error={statusError}
                setError={setStatusError}
            />
        </View>
    )
}

export default Inputs