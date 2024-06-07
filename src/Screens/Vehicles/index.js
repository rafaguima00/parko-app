import React, { useEffect, useState } from "react";
import {
    Text,
    View,
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
import { styles } from "./style"
import { useUser } from "../../Context/dataUserContext"
import ReadApi from "../../Services/readData";
import api from "../../Services/api";

const { corPrimaria } = theme;

export default function Vehicles({ navigation }) {

    const [botaoClicado, setBotaoClicado] = useState(null)
    const [carregandoVeiculos, setCarregandoVeiculos] = useState(false)
    const { veiculos, dataUser } = useUser()
    const { loadVehicles } = ReadApi()


    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                activeOpacity={0.9}
                style={(
                    botaoClicado == item.id ? styles.botaoAtivo : styles.botaoDesativado
                )}
                onPress={() => setBotaoClicado(item.id)}
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
                            `Tem certeza de que deseja excluir o veículo ${item.name}?`,
                            [
                                {
                                    text: 'OK',
                                    onPress: () => deletarVeiculos(item.id, item.name)
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
                    <Ionicons name="car" size={28} color={(botaoClicado == item.id ? '#fff' : '#545454')} />
                    <Text 
                        style={(
                            botaoClicado == item.id ? styles.nomeCarroAtivo : styles.nomeCarroDesativado
                        )}
                    >
                        {item.name}
                    </Text>
                </View>
                <Text 
                    style={(
                        botaoClicado == item.id ? styles.placaCarroAtivo : styles.placaCarroDesativado
                    )}
                >
                    {item.license_plate}
                </Text>
                <Text 
                    style={(
                        botaoClicado == item.id ? styles.corCarroAtivo : styles.corCarroDesativado
                    )}
                >
                    {item.color}
                </Text>
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

        await api.delete(`/vehicles/${idVeiculo}`)
        .then(() => {
            setCarregandoVeiculos(false)
            Alert.alert(`Veículo ${nomeVeiculo} excluído`)
        })
        .catch(e => {
            setCarregandoVeiculos(false)
            Alert.alert("Erro ao deletar veículo", e)
        })
    }

    useEffect(() => {
        loadVehicles(dataUser.id)
    }, [veiculos])

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
                data={veiculos}
                renderItem={renderItem}
                keyExtractor={item => item.placa}
                ListEmptyComponent={EmptyListMessage}
                showsHorizontalScrollIndicator={false}
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