import { styles } from "../style"
import { useNavigation } from "@react-navigation/native"
import { View, TouchableOpacity, Text } from "react-native"

const BotaoLoginCadastro = ({ realizarLogin }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.view}>
            <TouchableOpacity style={styles.botao} onPress={() => {
                navigation.navigate('Register')
            }}>
                <Text style={styles.textoBotao}>Criar Conta</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.botao} onPress={realizarLogin}>
                <Text style={styles.textoBotao}>Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default BotaoLoginCadastro;