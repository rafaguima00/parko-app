import React from "react"
import { Feather } from "react-native-vector-icons"
import { 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    FlatList 
} from "react-native"
import { theme } from "../../Theme"
import { styles } from "./style"

export default function Reservations({ navigation }) {

    const { fonteNegrito } = theme

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.itemLista}>
                    <View style={styles.viewEstacionamento}>
                        <Image source={item.imagem} />
                        <Text style={styles.nomeEstacionamento}>{item.nomeEstacionamento}</Text>
                    </View>
                    <View style={styles.infoReserva}>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>{item.entrada}</Text>
                            <View style={styles.horaEntrada}>
                                <Text style={styles.infoData}>{item.dataEntrada}</Text>
                                <Text style={styles.infoData}>{item.horarioEntrada}</Text>
                            </View>
                        </View>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>{item.saida}</Text>
                            <View style={styles.horaEntrada}>
                                <Text style={styles.infoData}>{item.dataSaida}</Text>
                                <Text style={styles.infoData}>{item.horarioSaida}</Text>
                            </View>
                        </View>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>{item.valor}</Text>
                            <Text style={styles.infoData}>{item.quantidadeValor}</Text>
                        </View>
                    </View>
                    <View style={styles.areaAvaliacao}>
                        <Text style={styles.textoReserva}>Avalie essa reserva</Text>
                        <TouchableOpacity style={styles.agrupar}>
                            <Feather name="star" size={32}/>
                            <Feather name="star" size={32}/>
                            <Feather name="star" size={32}/>
                            <Feather name="star" size={32}/>
                            <Feather name="star" size={32}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.botao}
                    onPress={() => {
                        alert('Sua avaliação foi enviada!')
                    }}>
                    <Text style={{ 
                        fontSize: 17, 
                        textAlign: 'center', 
                        fontFamily: fonteNegrito, 
                        color: "#fff" }}>Faça uma reclamação</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const EmptyListMessage = () => {
        return (
            <View>
                <Text style={styles.reservaVazio}>Nenhuma reserva foi feita até o momento</Text>
            </View>
        )
    }

    return (
        <View style={styles.areaContent}>
            <View style={styles.cabecalho}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Feather name="arrow-left" size={32}/>
                </TouchableOpacity>
                <Text style={styles.topoReservas}>Reservas</Text>
            </View>
            <FlatList 
                data={{}}
                renderItem={renderItem}
                keyExtractor={item => item.nomeEstacionamento}
                ListEmptyComponent={EmptyListMessage}
            />
        </View>
    )
}