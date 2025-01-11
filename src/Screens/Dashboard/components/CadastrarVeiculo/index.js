import React, { useState } from "react"
import { View, Text, TextInput, StyleSheet, Alert } from "react-native"
import { Botao } from "../../../../Components/Botao"
import { theme } from "../../../../Theme"
import api from "../../../../Services/api"
import { useUser } from "../../../../Context/dataUserContext"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior } from "../../style"
import { Feather } from "react-native-vector-icons"

const { corPrimaria } = theme

const CadastrarVeiculo = (props) => {

    const { setCadastrarVeiculo, setEscolherVeiculo } = props.states
    const { voltar } = props
    const { dataUser } = useUser()

    const [veiculo, setVeiculo] = useState({
        modelo: '',
        placa: '',
        cor: ''
    })
    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    async function registerVehicle() {
        await api.post("/vehicles", {
            id_costumer: dataUser.id,
            name_vehicle: veiculo.modelo,
            color: veiculo.cor,
            license_plate: veiculo.placa
        })
        .then(() => {
            Alert.alert("Veículo cadastrado com sucesso")
        })
        .catch(e => {
            Alert.alert("Erro ao adicionar veículo", e)
        })
    }

    async function adicionarVeiculo() {
        if (veiculo.modelo === "" || veiculo.placa === "" || veiculo.cor === "") {
            setErro(true)
            setMensagemErro('Preencha todos os campos')
            return
        }
        
        if (veiculo.placa.length < 7) {
            setErro(true)
            setMensagemErro('Placa de veículo inválida')
            return
        } 

        setErro(false)
        registerVehicle()
        setCadastrarVeiculo(false)
        setEscolherVeiculo(true)
        setVeiculo({})
    }

    return <>
        <View style={[styles.dashContent, styles.escolher]} >
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Cadastrar Veículo</TituloPrincipal>
            </TopModal>
            <View style={styles.formCard}>
                <TextInput
                    placeholder={"Modelo do veículo"}
                    style={styles.input}
                    value={veiculo.modelo}
                    onChangeText={text => setVeiculo({ ...veiculo, modelo: text })}
                    autoCapitalize={'words'}
                />
                <TextInput
                    placeholder={"Placa do veículo"}
                    style={styles.input}
                    value={veiculo.placa}
                    onChangeText={text => setVeiculo({ ...veiculo, placa: text })}
                    autoCapitalize={'characters'}
                    maxLength={7}
                />
                <TextInput
                    placeholder={"Cor do veículo"}
                    style={styles.input}
                    value={veiculo.cor}
                    onChangeText={text => setVeiculo({ ...veiculo, cor: text })}
                    autoCapitalize={'words'}
                />

                <View>
                    {erro &&
                        <Text style={{ color: 'red' }}>{mensagemErro}</Text>
                    }
                </View>
            </View>
            <View style={{
                position: 'absolute',
                bottom: 20,
                width: '100%',
                marginHorizontal: 26
            }}>
                <Botao
                    children={"Confirmar"}
                    corDeFundo={corPrimaria}
                    largura={'100%'}
                    corDoTexto={'#fff'}
                    negrito
                    aoPressionar={adicionarVeiculo}
                />
            </View>
        </View>
    </>
}

export default CadastrarVeiculo