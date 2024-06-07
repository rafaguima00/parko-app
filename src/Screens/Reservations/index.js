import React, { useContext, useEffect } from "react"
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
import ReadApi from "../../Services/readData"
import { ReservaContext } from "../../Context/reservaContext"
import { useUser } from "../../Context/dataUserContext"
import { formatCurrency } from "../../Services/formatCurrency"

export default function Reservations({ navigation }) {

    const { fonteNegrito } = theme
    const { loadReservations } = ReadApi()
    const { reservations } = useContext(ReservaContext)
    const { dataUser } = useUser()

    useEffect(() => {
        loadReservations()
    }, [])

    const renderItem = ({ item }) => {
        return (
            <View>
                <View style={styles.itemLista}>
                    <View style={styles.viewEstacionamento}>
                        <Image source={item.image} />
                        <Text style={styles.nomeEstacionamento}>{item.establishment}</Text>
                    </View>
                    <View style={styles.infoReserva}>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>Entrada</Text>
                            <View style={styles.horaEntrada}>
                                <Text style={styles.infoData}>{item.data_entrada}</Text>
                                <Text style={styles.infoData}>{item.hora_entrada}</Text>
                            </View>
                        </View>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>Saída</Text>
                            <View style={styles.horaEntrada}>
                                <Text style={styles.infoData}>{item.data_saida}</Text>
                                <Text style={styles.infoData}>{item.hora_saida}</Text>
                            </View>
                        </View>
                        <View style={styles.entrada}>
                            <Text style={styles.infoEntrada}>Valor</Text>
                            <Text style={styles.infoData}>{formatCurrency(item.value)}</Text>
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
                    <Text 
                        style={{ 
                            fontSize: 17, 
                            textAlign: 'center', 
                            fontFamily: fonteNegrito, 
                            color: "#fff" 
                        }}
                    >
                        Faça uma reclamação
                    </Text>
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

    const reservaFinalizada = reservations.filter(
        item => item.id_costumer == dataUser.id && 
        item.status == "Finalizado"
    )

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
                data={reservaFinalizada}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                showsVerticalScrollIndicator={false}
            />
        </View>
    )
}