import React, { useState } from "react";
import { Text, View, TouchableOpacity, ActivityIndicator } from "react-native";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { Feather } from "react-native-vector-icons";
import { styles } from "./style"
import { theme } from "../../Theme";
import { Botao } from "../../Components/Botao";

export default function RegisterVehicle({ navigation }) {

    const { corPrimaria } = theme;

    const [dados, setDados] = useState({
        nome: '',
        placa: '',
        cor: ''
    })

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')
    const [carregando, setCarregando] = useState(false)

    const placeholder = [
        {
            placeholder: 'Nome do veículo',
            value: dados.nome,
            onChange: text => setDados({ ...dados, nome: text })
        },
        {
            placeholder: 'Placa do veículo',
            value: dados.placa,
            onChange: text => setDados({ ...dados, placa: text })
        },
        {
            placeholder: 'Cor do veículo',
            value: dados.cor,
            onChange: text => setDados({ ...dados, cor: text })
        },
    ]

    async function adicionarVeiculo() {
        if (dados.nome === "" || dados.placa === "" || dados.cor === "") {
            setErro(true)
            setMensagemErro('Preencha todos os campos')
        } else if (dados.placa.length < 7) {
            setErro(true)
            setMensagemErro('Placa de veículo inválida')
        } else {
            setCarregando(true)
            setErro(false)
            navigation.goBack()
            setCarregando(false)
            console.log("veiculo adicionado")
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
                        autoCapitalize={item.placeholder == "Placa do veículo" ? 'characters' : 'words'}
                        maxLength={item.placeholder == "Placa do veículo" ? 7 : undefined}
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