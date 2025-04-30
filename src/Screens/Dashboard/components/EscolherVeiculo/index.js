import React, { useContext, useEffect, useState } from "react"
import { Text, View, FlatList, TouchableOpacity, Alert } from "react-native"
import { Botao } from "../../../../Components/Botao"
import { useUser } from "../../../../Context/dataUserContext"
import { Ionicons, Feather } from 'react-native-vector-icons'
import { theme } from "../../../../Theme"
import api from "../../../../Services/api"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior } from "../../style"
import { emptyVehicle } from "../../../../Mocks/emptyList"
import { ReservaContext } from "../../../../Context/reservaContext"

const { corPrimaria } = theme

const EscolherVeiculo = (props) => {

    const { 
        setEscolherVeiculo, 
        setCadastrarVeiculo, 
        setPagamento
    } = props.states
    const { voltar } = props
    const { veiculos } = useUser()
    const { setNovaReserva, novaReserva } = useContext(ReservaContext)

    const [botaoCarroAtivo, setBotaoCarroAtivo] = useState(null) // Veículo selecionado

    async function deletarVeiculos(id) {
        await api.delete(`/vehicles/${id}`)
        .then(() => {
            Alert.alert("Veículo excluído")
        })
        .catch(e => {
            Alert.alert("Erro ao deletar veículo", e)
        })
    }

    const cliqueBotao = (item) => {
        setBotaoCarroAtivo(item.id)
    }

    function next() {
        setNovaReserva({
            ...novaReserva,
            id_vehicle: botaoCarroAtivo
        })
        setEscolherVeiculo(false)
        setPagamento(true)
    }

    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={(
                    botaoCarroAtivo === item.id ? styles.botaoAtivo : styles.botaoDesativado
                )}
                onPress={() => {
                    cliqueBotao(item)
                }}
                activeOpacity={1}
            >
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        right: -5,
                        top: -5,
                        backgroundColor: "rgba(125, 125, 125, 0.6)",
                        paddingVertical: 5,
                        paddingHorizontal: 5,
                        borderRadius: 25
                    }}
                    onPress={() => {
                        Alert.alert(
                            "Excluir veículo",
                            "Tem certeza de que deseja excluir o veículo?",
                            [
                                {
                                    text: 'OK',
                                    onPress: () => deletarVeiculos(item.id)
                                },
                                {
                                    text: 'Cancelar'
                                }
                            ]
                        )
                    }}
                >
                    <Feather name="x" color="#000" size={15} />
                </TouchableOpacity>
                <View style={styles.viewCarro}>
                    <Ionicons name="car" size={28} color={(botaoCarroAtivo === item.id ? '#fff' : '#545454')} />
                    <Text 
                        style={(
                            botaoCarroAtivo === item.id ? styles.nomeCarroAtivo : styles.nomeCarroDesativado
                        )}
                    >
                        {item.name}
                    </Text>
                </View>
                <Text 
                    style={(
                        botaoCarroAtivo === item.id ? styles.placaCarroAtivo : styles.placaCarroDesativado
                    )}
                >
                    {item.license_plate}
                </Text>
                <Text 
                    style={(
                        botaoCarroAtivo === item.id ? styles.corCarroAtivo : styles.corCarroDesativado
                    )}
                >
                    {item.color}
                </Text>
            </TouchableOpacity>
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.veiculosVazio}>
                {emptyVehicle}
            </Text>
        )
    }

    return <>
        <View style={[styles.dashContent, styles.escolher]}>
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Qual seu veículo?</TituloPrincipal>
            </TopModal>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.txtSelecioneVeiculo} >Selecione seu veículo</Text>
                <TouchableOpacity>
                    <Text
                        style={styles.botaoMais}
                        onPress={() => {
                            setEscolherVeiculo(false)
                            setCadastrarVeiculo(true)
                        }}
                    >
                        +
                    </Text>
                </TouchableOpacity>
            </View>
            <FlatList
                contentContainerStyle={styles.itens}
                numColumns={2}
                ListEmptyComponent={EmptyListMessage}
                data={veiculos}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
            <View style={{ marginBottom: 32 }}>
                <Botao
                    children={"Confirmar"}
                    corDeFundo={(botaoCarroAtivo ? corPrimaria : "rgba(125, 125, 125, 0.4)")}
                    largura={'100%'}
                    corDoTexto={'#fff'}
                    negrito
                    disabled={(botaoCarroAtivo ? false : true)}
                    aoPressionar={next}
                />
            </View>
        </View>
    </>
}

export default EscolherVeiculo