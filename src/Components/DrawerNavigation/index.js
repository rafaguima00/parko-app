import React from "react";
import logo from "../../../assets/logo-parko.png"
import {
    View,
    Text,
    Image,
    Alert,
    TouchableOpacity
} from "react-native"
import { Feather, Octicons } from "react-native-vector-icons"
import { theme } from "../../Theme"
import { useNavigation } from "@react-navigation/native"
import { Botao } from "../Botao"
import { styles } from "./style"
import fotoPerfil from "../../../assets/user-2.png"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../../Context/dataUserContext"

function CustomDrawer() {
    const navigation = useNavigation()

    const { corPrimaria } = theme
    const { dataUser } = useUser()
    const { email, password, name, cpf, tel } = dataUser

    let register = false

    const logout = async () => {
        await AsyncStorage.removeItem("token")
        navigation.replace("Login")
    }
    
    const routes = [
        {
            navigate: "Veiculos",
            nameIcon: "disc",
            texto: 'Veículos'
        },
        {
            navigate: "Reservas",
            nameIcon: "calendar",
            texto: 'Histórico'
        },
        {
            navigate: "Pagamento",
            nameIcon: "dollar-sign",
            texto: 'Pagamentos'
        },
        {
            navigate: "Descontos",
            nameIcon: "percent",
            texto: 'Descontos'
        },
        {
            navigate: "Favoritos",
            nameIcon: "heart",
            texto: 'Favoritos'
        },
        {
            navigate: "Ajuda",
            nameIcon: "help-circle",
            texto: 'Ajuda'
        },
    ]

    return (
        <View style={styles.menuLateral} >
            <Image source={logo} style={{ width: '51%', height: '6%', marginVertical: 32 }} />
            <TouchableOpacity onPress={() => navigation.navigate('Profile', { email, password, name, cpf, tel, register })} >
                <Image source={fotoPerfil} style={{ width: 140, height: 140 }} />
                <View style={styles.botaoEdit}>
                    <Octicons name="pencil" size={24} color="white" />
                </View>
            </TouchableOpacity>
            <View style={{ marginTop: 22, marginBottom: 100 }}>
                {routes.map((item, index) => (
                    <TouchableOpacity
                        key={index}
                        style={styles.linkNavigation}
                        onPress={() => {
                            navigation.navigate(item.navigate)
                        }}
                    >
                        <Feather name={item.nameIcon} size={19} color={'#545454'} />
                        <Text style={styles.link}>{item.texto}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Botao
                children={"Sair"}
                corDeFundo={corPrimaria}
                largura={'70%'}
                corDoTexto={'#fff'}
                negrito
                aoPressionar={() => {
                    Alert.alert(
                        "Sair",
                        "Deseja sair da sua conta?",
                        [
                            {
                                text: "OK",
                                onPress: logout
                            },
                            {
                                text: "Cancelar"
                            }
                        ]
                    )
                }}
            />
        </View>
    )
}

export default CustomDrawer;