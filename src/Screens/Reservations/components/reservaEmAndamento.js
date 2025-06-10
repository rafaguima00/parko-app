import { View, Image, Text } from "react-native"
import { BotaoReserva, EstadoReserva, styles, TextoBotao } from "../style"
import { formatCurrency } from "../../../Services/formatCurrency"
import { theme } from "../../../Theme"
import { useNavigation } from "@react-navigation/native"

const ReservaEmAndamento = ({ item }) => {

    const { corPrimaria } = theme

    const navigation = useNavigation()

    function calcularDiferencaHoras(dataHoraInicial, dataHoraFinal) {
        // Converter as strings para objetos Date
        const [dataInicial, horaInicial] = dataHoraInicial.split(' ')
        const [dia1, mes1, ano1] = dataInicial.split('/').map(Number)
        const [h1, m1, s1] = horaInicial.split(':').map(Number)
      
        const [dataFinal, horaFinal] = dataHoraFinal.split(' ')
        const [dia2, mes2, ano2] = dataFinal.split('/').map(Number)
        const [h2, m2, s2] = horaFinal.split(':').map(Number)
      
        const inicio = new Date(ano1, mes1 - 1, dia1, h1, m1, s1)
        const fim = new Date(ano2, mes2 - 1, dia2, h2, m2, s2)
      
        // Calcular a diferença em milissegundos e converter para horas
        const diferencaMs = fim - inicio
        const diferencaHoras = diferencaMs / (1000 * 60 * 60)
      
        if(Math.ceil(diferencaHoras) > 1) {
            return `${Math.ceil(diferencaHoras)} horas`
        }

        return `${Math.ceil(diferencaHoras)} hora`
    }

    return <>
        <View>
            <EstadoReserva>Reserva em Andamento</EstadoReserva>
            <View style={styles.itemListaEmAndamento}>
                <View style={styles.viewEstacionamento}>
                    <Image 
                        style={{ width: 45, height: 45, borderRadius: 50, borderWidth: 2, borderColor: corPrimaria }}
                        source={item.image} 
                        resizeMode="contain"
                    />
                    <Text style={styles.nomeEstacionamento}>{item.establishment}</Text>
                </View>
                <View style={styles.viewReservation}>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Veículo</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItemCarro}>{item.name_vehicle}</Text>
                            <Text style={styles.infoItemPlaca}>{item.license_plate}</Text>
                            <Text style={styles.infoItemCor}>{item.color}</Text>
                        </View>
                    </View>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Duração</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>
                                {
                                    calcularDiferencaHoras(
                                        `${item.data_entrada} ${item.hora_entrada}`, 
                                        `${item.data_saida} ${item.hora_saida}`
                                    )
                                }
                            </Text>
                            <Text style={styles.infoItem}>
                                {`${item.data_entrada}\n ${item.hora_entrada}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Valor</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>{formatCurrency(item.value)}</Text>
                        </View>
                    </View>
                </View>
                <BotaoReserva 
                    activeOpacity={0.7} 
                    onPress={() => { 
                        navigation.navigate('Tempo de Espera', {
                            idDestination: item.id_establishment,
                            idReservation: item.id
                        })
                    }}
                    background={corPrimaria}
                >
                    <TextoBotao>Acompanhar reserva</TextoBotao>
                </BotaoReserva>
            </View>
        </View>
    </>
}

export default ReservaEmAndamento