import React, { useState } from "react";
import { View } from 'react-native';
import { TextInput, HelperText } from 'react-native-paper';
import { Alerta } from "../../../Components/SnackBar";
import { styles } from "../style";

const InputLogin = ({ 
    error, 
    messageError,
    statusError, 
    setStatusError,
    mensagemErro,
    email, 
    senha, 
    setEmail, 
    setSenha, 
    secureTextEntry 
}) => {

    const [secureMode, setSecureMode] = useState(secureTextEntry)

    return (
        <View style={styles.flexInput}>
            <TextInput 
                style={styles.input}
                outlineStyle={{borderRadius: 50, borderColor: 'transparent'}}
                mode="outlined"
                value={email} 
                error={statusError == 'email'}
                messageError={mensagemErro}
                onChangeText={setEmail} 
                keyboardType='email-address'
                label={'Email'}
                activeOutlineColor="#545454"
                textColor="#545454"
                autoCapitalize='none'
            />

            <TextInput 
                style={styles.input}
                outlineStyle={{borderRadius: 50, borderColor: 'transparent'}}
                mode="outlined"
                value={senha} 
                onChangeText={setSenha} 
                label={"Senha"}
                error={statusError == "senha"}
                messageError={mensagemErro}
                activeOutlineColor="#545454"
                textColor="#545454"
                autoCapitalize="none"
                secureTextEntry={secureMode}
                right={
                    secureTextEntry ? 
                    <TextInput.Icon
                        icon={secureMode ? 'eye-off' : 'eye'}
                        onPress={() => setSecureMode(!secureMode)}
                    /> : null
                }
            />
            <Alerta 
                message={mensagemErro}
                error={statusError == "no-user" ? true : false}
                setError={setStatusError}
            />
            {error && <HelperText type="error" visible={error}>
                {messageError}
            </HelperText>}

        </View>
    )
}

export default InputLogin