import React, { useState } from "react"
import { Text, View, ActivityIndicator, Alert, SafeAreaView } from "react-native"
import { ScrollView, TextInput } from "react-native-gesture-handler"
import { styles } from "./style"
import { theme } from "../../Theme"
import { Botao } from "../../Components/Botao"
import api from "../../Services/api"
import { useUser } from "../../Context/dataUserContext"
import TopArrowLeft from "../../Components/TopArrowLeft"
import LoadingModal from "../../Components/Loading"

export default function RegisterVehicle({ navigation }) {

    const { corPrimaria } = theme

    const [dados, setDados] = useState({
        nome: "",
        placa: "",
        cor: ""
    })
    const { dataUser } = useUser()

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState("")
    const [loading, setLoading] = useState(false)

    const placeholder = [
        {
            id: 1,
            placeholder: "Modelo do veículo",
            value: dados.nome,
            onChange: text => setDados({ ...dados, nome: text })
        },
        {
            id: 2,
            placeholder: "Placa do veículo",
            value: dados.placa,
            onChange: text => setDados({ ...dados, placa: text })
        },
        {
            id: 3,
            placeholder: "Cor do veículo",
            value: dados.cor,
            onChange: text => setDados({ ...dados, cor: text })
        },
    ]

    async function criarVeiculo() {
        await api.post(`/vehicles`, {
            id_costumer: dataUser.id,
            name_vehicle: dados.nome,
            color: dados.cor,
            license_plate: dados.placa
        })
        .then(() => {
            Alert.alert("Veículo adicionado com sucesso")
            navigation.goBack()
        })
        .catch(e => {
            Alert.alert("Erro ao adicionar veículo", e)
        })
        .finally(() => {
            setErro(false)
            setLoading(false)
        })
    }

    async function adicionarVeiculo() {
        setLoading(true)

        if (dados.nome === "" || dados.placa === "" || dados.cor === "") {
            setErro(true)
            setLoading(false)
            setMensagemErro('Preencha todos os campos')
            return
        }
        
        if (dados.placa.length < 7) {
            setErro(true)
            setLoading(false)
            setMensagemErro('Placa de veículo inválida')
            return
        } 

        criarVeiculo()  
    }

    return <>
        <SafeAreaView style={styles.areaContent}>
            <ScrollView>
                <TopArrowLeft children={"Adicionar Veículo"} />
                <View style={styles.formCard}>
                    {placeholder.map((item, index) => (
                        <TextInput
                            key={index}
                            placeholder={item.placeholder}
                            style={styles.input}
                            value={item.value}
                            onChangeText={item.onChange}
                            autoCapitalize={item.id == 2 ? 'characters' : 'words'}
                            maxLength={item.id == 2 ? 7 : undefined}
                        />
                    ))}
                    {erro &&
                        <View>
                            <Text style={{ color: 'red' }}>{mensagemErro}</Text>
                        </View>
                    }
                </View>
                <Botao
                    estilo={{ marginHorizontal: 32 }}
                    children={"Confirmar"}
                    corDeFundo={corPrimaria}
                    corDoTexto={'#fff'}
                    negrito
                    aoPressionar={adicionarVeiculo}
                />
            </ScrollView>
            <LoadingModal loading={loading} />
        </SafeAreaView>
    </>
}