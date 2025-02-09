import { styles } from "./style"
import { View, TouchableOpacity, Text } from "react-native"
import { FontAwesome } from "react-native-vector-icons"

export default function BotaoLogin() {

    return <>
    <View style={styles.loginSecundario}>
        <TouchableOpacity style={styles.botaoFacebook} onPress={() => {
            
        }}>
            <FontAwesome name="facebook" size={20} color="white"/>
            <Text style={styles.textoBotaoRedeSocial}>Facebook</Text>
            <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoGoogle} onPress={() => {
            
        }}>
            <FontAwesome name="google" size={20} color="white"/>
            <Text style={styles.textoBotaoRedeSocial}>Google</Text>
            <Text></Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoApple} onPress={() => {}}>
            <FontAwesome name="apple" size={20} color="white"/>
            <Text style={styles.textoBotaoRedeSocial}>Apple</Text>
            <Text></Text>
        </TouchableOpacity>
    </View>
    </>
}