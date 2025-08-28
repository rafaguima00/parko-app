import { useEffect, useState, useCallback } from "react"
import {
    Image,
    View,
    Text,
    ScrollView,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Alert,
    TouchableOpacity
} from "react-native"
import { DivButton } from "./style"
import { Octicons, Feather } from "react-native-vector-icons"
import IconeEditarPerfil from "../../Components/IconEdit"
import fotoPerfil from "../../../assets/user-2.png"
import { theme } from '../../Theme'
import { Botao } from "../../Components/Botao"
import { styles } from "./style"
import api from "../../Services/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useUser } from "../../Context/dataUserContext"
import { jwtDecode } from "jwt-decode"
import LoadingModal from "../../Components/Loading"
import { useFocusEffect } from '@react-navigation/native'

export default function Profile({ navigation, route }) {

    const [carregando, setCarregando] = useState(true)
    const [data, setData] = useState({})

    const { dataUser, setDataUser } = useUser()
    const { register } = route.params
    const { corVermelha, corPrimaria } = theme

    function formatarCPF(cpf) {
        return cpf
            .replace(/\D/g, '') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d)/, '$1.$2') 
            .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
    }

    function formatarTelefone(tel) {
        return tel
            .replace(/\D/g, '')
            .replace(/(\d{2})(\d)/, '($1) $2')
            .replace(/(\d{5})(\d)/, '$1-$2')
            .replace(/(-\d{4})\d+?$/, '$1')
    }

    function removerMascara(valor) {
        return valor.replace(/\D/g, '')
    }

    function salvarDados() {
        if (
            data.name === "" ||
            data.tel === "" ||
            data.cpf === ""
        ) {
            return Alert.alert("Aviso", "Preencha os campos vazios")
        } 

        Alert.alert(
            "",
            "Deseja salvar os dados?",
            [
                {
                    text: "Sim",
                    onPress: () => atualizarUsuario(dataUser.id)
                },
                {
                    text: "Não"
                }
            ]
        )
        
    }

    async function atualizarUsuario(id) {
        setCarregando(true)
        
        const novosDados = {
            name: data.name,
            cpf: removerMascara(data.cpf),
            tel: removerMascara(data.tel)
        }

        await api.put(`/users/${id}`, novosDados)
        .then(() => {
            if (register) {
                Alert.alert(`Bem-vindo(a) ${data.name}!`)
            }

            setDataUser({ 
                ...dataUser, 
                name: data.name,
                cpf: data.cpf,
                tel: data.tel
            })
            navigation.replace("Map")
        })
        .catch(e => {
            Alert.alert(e.response?.data?.message || "Erro ao atualizar usuário")
        })
        .finally(() => {
            setCarregando(false)
        })
    }

    const alertWarning = (id) => {
        Alert.alert(
            "Desativar conta",
            "Você tem certeza que deseja desativar sua conta? Esta ação excluirá todos os seus dados.",
            [
                {
                    text: 'Sim',
                    onPress: () => deleteAccount(id)
                },
                {
                    text: 'Não'
                }
            ]
        )
    }

    const deleteAccount = async (id) => {
        setCarregando(true)

        await api.delete(`/users/${id}`)
        .then(() => {
            Alert.alert("Sua conta foi desativada")
            navigation.replace("Login")
        })
        .catch(e => {
            Alert.alert("Erro ao deletar conta", e.message)
        })
        .finally(() => {
            setCarregando(false)
        })
    }

    useFocusEffect(
        useCallback(() => {
            (async () => {
                try {
                    const token = await AsyncStorage.getItem("token")
                    if (!token) return navigation.replace("Login")

                    const decoded = jwtDecode(token)
                    const response = await api.get(`/users/${decoded.user.id}`)
                    setData(response.data[0])
                    setDataUser(response.data[0])
                } catch (error) {
                    console.error("Erro ao carregar perfil:", error)
                    navigation.replace("Login")
                } finally {
                    setCarregando(false)
                }
            })()
        }, [])
    )

    useEffect(() => {
        setData(dataUser)
    }, [dataUser])

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        >
            <ScrollView contentContainerStyle={styles.content}>
                <View>
                    <TouchableOpacity
                        onPress={() => navigation.replace("Map")}
                        style={{ marginHorizontal: 36, marginTop: 38 }}
                        activeOpacity={0.9}
                    >
                        <Feather name="arrow-left" size={36} color="black" />
                    </TouchableOpacity>
                    <View>
                        <Image source={fotoPerfil} style={styles.top} />
                    </View>
                </View>
    
                <View style={styles.perfil}>
                    <TouchableOpacity style={styles.botaoEdit} activeOpacity={0.7} >
                        <Octicons name="pencil" size={32} color="white" />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Nome completo</Text>
                    <TouchableOpacity style={styles.displayUsuario} activeOpacity={0.7}>
                        <TextInput
                            placeholder="Digite seu nome"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            value={data.name}
                            onChangeText={text => setData({ ...data, name: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>Telefone</Text>
                    <TouchableOpacity style={styles.displayUsuario} activeOpacity={0.7}>
                        <TextInput
                            placeholder="Digite o número do celular"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            keyboardType="numeric"
                            value={formatarTelefone(data.tel || '')}
                            onChangeText={(text) => setData({ ...data, tel: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <Text style={styles.nome}>CPF</Text>
                    <TouchableOpacity style={styles.displayUsuario} activeOpacity={0.7}>
                        <TextInput
                            placeholder="Digite seu CPF"
                            placeholderTextColor={corPrimaria}
                            style={styles.dadosUsuario}
                            keyboardType="numeric"
                            value={formatarCPF(data.cpf || '')}
                            onChangeText={(text) => setData({ ...data, cpf: text })}
                        />
                        <IconeEditarPerfil />
                    </TouchableOpacity>

                    <DivButton>
                        <Botao
                            children={"Desativar conta"}
                            corDeFundo={corVermelha}
                            negrito
                            corDoTexto={'#fff'}
                            aoPressionar={() => alertWarning(dataUser.id)}
                        />
                        <Botao
                            children={"Salvar"}
                            corDeFundo={corPrimaria}
                            negrito
                            corDoTexto={'#fff'}
                            aoPressionar={salvarDados}
                        />
                    </DivButton>
                </View>
                <LoadingModal loading={carregando} />
            </ScrollView>
        </KeyboardAvoidingView>
    )
    
}