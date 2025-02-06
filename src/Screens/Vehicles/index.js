import React, { useEffect, useState } from "react"
import {
    Text,
    View,
    Image,
    FlatList,
    ScrollView,
    Alert
} from "react-native"
import veiculo from "../../../assets/image_vehicle.png"
import { theme } from "../../Theme"
import { Botao } from "../../Components/Botao"
import { styles } from "./style"
import { useUser } from "../../Context/dataUserContext"
import ReadApi from "../../Services/readData"
import api from "../../Services/api"
import { emptyVehicle } from "../../Mocks/emptyList"
import LoadingModal from "../../Components/Loading"
import TopArrowLeft from "../../Components/TopArrowLeft"
import VehiclesList from "../../Components/VehiclesList"

export default function Vehicles({ navigation }) {

    const [loading, setLoading] = useState(false)
    const [botaoClicado, setBotaoClicado] = useState(null)
    const { veiculos, dataUser } = useUser()
    const { loadVehicles } = ReadApi()

    const { corPrimaria } = theme

    const EmptyListMessage = () => {
        return (
            <Text style={styles.veiculosVazio}>{emptyVehicle}</Text>
        )
    }
    
    async function deletarVeiculos(idVeiculo, nomeVeiculo) {
        setLoading(true)

        await api.delete(`/vehicles/${idVeiculo}`)
        .then(() => {
            Alert.alert(`Veículo ${nomeVeiculo} excluído`)
        })
        .catch(e => {
            Alert.alert("Erro ao deletar veículo", e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        loadVehicles(dataUser.id)
    }, [veiculos])

    return (
        <ScrollView contentContainerStyle={styles.areaContent}>
            <TopArrowLeft children={"Veículos"} />
            <View style={styles.circuloVerde}>
                <Image source={veiculo} style={styles.imagemVeiculo} />
            </View>
            <Text style={styles.selectVehicle}>Selecione seu veículo</Text>
            <FlatList
                style={{ marginTop: 20, marginBottom: 46 }}
                horizontal
                data={veiculos}
                renderItem={item => (
                    <VehiclesList 
                        {...item} 
                        deletarVeiculos={deletarVeiculos} 
                        botaoClicado={botaoClicado}
                        setBotaoClicado={setBotaoClicado}
                    />
                )}
                keyExtractor={item => item.id}
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
            <LoadingModal loading={loading} />
        </ScrollView>
    )
}