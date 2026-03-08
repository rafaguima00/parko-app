import { BotaoExcluir, Color, LicensePlate, NameVehicle, SelecionarVeiculo, ViewVehicle } from "./style"
import { Ionicons } from "react-native-vector-icons"
import { Alert, Text } from "react-native"

const VehiclesList = ({ item, deletarVeiculos, botaoClicado, setBotaoClicado }) => {
    
    function handleVehiclePress(id) {
        setBotaoClicado(id)
    }

    return <>
        <SelecionarVeiculo
            activeOpacity={0.9}
            ativo={botaoClicado == item.id ? true : false}
            onPress={() => handleVehiclePress(item.id)}
        >
            <BotaoExcluir
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
            </BotaoExcluir>
            <ViewVehicle>
                <Ionicons name="car" size={28} color={(botaoClicado == item.id ? '#fff' : '#545454')} />
                <NameVehicle ativo={botaoClicado == item.id ? true : false}>{item.name}</NameVehicle>
            </ViewVehicle>
            <LicensePlate ativo={botaoClicado == item.id ? true : false}>{item.license_plate}</LicensePlate>
            <Color ativo={botaoClicado == item.id ? true : false}>{item.color}</Color>
        </SelecionarVeiculo>
    </>
}

export default VehiclesList