import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Feather } from "react-native-vector-icons";
import { styles } from "./style"
import { theme } from "../../Theme";
import { Botao } from "../../Components/Botao";
import api from "../../Services/api";
import { useUser } from "../../Context/dataUserContext";

export default function RegisterVehicle({ navigation }) {

    const { corPrimaria } = theme;

    const [dados, setDados] = useState({
        nome: '',
        placa: '',
        cor: ''
    })
    const { dataUser } = useUser()

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(false)

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
            setCarregando(false)
            Alert.alert("Veículo adicionado com sucesso")
            navigation.goBack()
        })
        .catch(e => {
            setCarregando(false)
            Alert.alert("Erro ao adicionar veículo", e)
        })
    }

    async function adicionarVeiculo() {
        setCarregando(true)

        if (dados.nome === "" || dados.placa === "" || dados.cor === "") {
            setErro(true)
            setCarregando(false)
            setMensagemErro('Preencha todos os campos')
        } else if (dados.placa.length < 7) {
            setErro(true)
            setCarregando(false)
            setMensagemErro('Placa de veículo inválida')
        } else {
            setErro(false)
            criarVeiculo()
        }
    }

    return (
        <ScrollView contentContainerStyle={styles.areaContent}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <Text style={styles.addCard}>Adicionar veículo</Text>
            </View>
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

                {carregando &&
                    <View>
                        <ActivityIndicator size={'large'} color={'#7d7d7d'} />
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
    )
}