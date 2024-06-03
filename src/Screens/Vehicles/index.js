import React, { useState } from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    Alert,
    Modal,
    ActivityIndicator
} from "react-native";
import veiculo from "../../../assets/medium-vehicle.png"
import { Ionicons, Feather } from "react-native-vector-icons"
import { theme } from "../../Theme"
import { Botao } from "../../Components/Botao"
import dadosCarro from "../../Mocks/dadosVeiculo"
import { styles } from "./style"

const { corPrimaria } = theme;

export default function Vehicles({ navigation }) {

    const [botaoAtivo, setBotaoAtivo] = useState(null);
    const [veiculos, setVeiculos] = useState([])
    const [carregandoVeiculos, setCarregandoVeiculos] = useState(false)

    const cliqueBotao = (item) => {
        setBotaoAtivo(item.placa);
    };


    const renderItem = ({ item }) => {
        const botaoClicado = botaoAtivo === item.placa;

        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={(
                    botaoClicado ? styles.botaoAtivo : styles.botaoDesativado
                )}
                onPress={() => cliqueBotao(item)}
            >
                <TouchableOpacity 
                    style={{
                        position: 'absolute', 
                        right: -5, 
                        top: -5,
                        backgroundColor: 'rgba(125, 125, 125, 0.6)',
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        borderRadius: 25
                    }} 
                    onPress={() => {
                        Alert.alert(
                            "Excluir veículo",
                            `Tem certeza de que deseja excluir o veículo ${item.nome}?`,
                            [
                                {
                                    text: 'OK',
                                    onPress: () => deletarVeiculos(item.id, item.nome)
                                },
                                {
                                    text: 'Cancelar'
                                }
                            ]
                        )
                    }}
                >
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={styles.viewCarro}>
                    <Ionicons name="car" size={28} color={(botaoClicado ? '#fff' : '#545454')} />
                    <Text style={(
                        botaoClicado ? styles.nomeCarroAtivo : styles.nomeCarroDesativado
                    )}>{item.nome}</Text>
                </View>
                <Text style={(
                    botaoClicado ? styles.placaCarroAtivo : styles.placaCarroDesativado
                )}>{item.placa}</Text>
                <Text style={(
                    botaoClicado ? styles.corCarroAtivo : styles.corCarroDesativado
                )}>{item.cor}</Text>
            </TouchableOpacity>
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.veiculosVazio}>Nenhum veículo cadastrado</Text>
        )
    }

    async function deletarVeiculos(idVeiculo, nomeVeiculo) {
        setCarregandoVeiculos(true)

        console.log(`Veículo ${idVeiculo}, ${nomeVeiculo} excluído`)
    }

    return (
        <SafeAreaView style={styles.areaContent}>
            <View style={styles.cabecalho}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <Text style={styles.telaVeiculos}>Veículos</Text>
            </View>
            <View style={styles.circuloVerde}>
                <Image source={veiculo} style={styles.imagemVeiculo} />
            </View>
            <Text style={styles.selectVehicle}>Selecione seu veículo</Text>
            <FlatList
                style={{ marginTop: 20, marginBottom: 46 }}
                horizontal
                data={dadosCarro}
                renderItem={renderItem}
                keyExtractor={item => item.placa}
                ListEmptyComponent={EmptyListMessage}
            />
            <Botao 
                children={'Adicionar'}
                corDeFundo={corPrimaria}
                corDoTexto={'#fff'}
                negrito
                largura={'100%'}
                aoPressionar={() => navigation.navigate('Register Vehicle')}
            />
            <Modal
                visible={carregandoVeiculos}
                transparent={true}
                onRequestClose={() => {}}
                animationType='fade'
            >
                <View
                    style={{
                        backgroundColor: 'rgba(125, 125, 125, 0.6)',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size={'small'} color={'#fff'} />
                </View>
            </Modal>
        </SafeAreaView>
    )
}