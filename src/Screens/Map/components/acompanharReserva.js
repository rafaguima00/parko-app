import { Image, Text, TouchableOpacity, View } from "react-native"
import { formatCurrency } from "../../../Services/formatCurrency"
import { theme } from "../../../Theme"
import { styles } from "../styles"
import { useNavigation } from "@react-navigation/native"
import { useContext } from "react"
import { ReservaContext } from "../../../Context/reservaContext"

const AcompanharReserva = (props) => {

    const { reservaFeita } = useContext(ReservaContext)
    const { findReservation } = props
    const { 
        color,
        data_entrada,
        data_saida,
        establishment,
        hora_entrada,
        hora_saida, 
        id,
        id_establishment,
        image_url_establishment, 
        license_plate, 
        name_vehicle,
        value
    } = findReservation ?? {}
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
      
        if (Math.ceil(diferencaHoras) > 1) {
            return `${Math.ceil(diferencaHoras)} horas`
        }

        return `${Math.ceil(diferencaHoras)} hora`
    }

    return <>
        {(reservaFeita && findReservation) &&
            <View style={styles.itemLista}>
                <View style={styles.viewEstacionamento}>
                    <Image 
                        style={{ width: 45, height: 45, borderRadius: 50, borderWidth: 2, borderColor: corPrimaria }}
                        source={{ uri: image_url_establishment }} 
                        resizeMode="contain"
                    />
                    <Text style={styles.nomeEstacionamento}>{establishment}</Text>
                </View>
                <View style={styles.viewReservation}>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Veículo</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItemCarro}>{name_vehicle}</Text>
                            <Text style={styles.infoItemPlaca}>{license_plate}</Text>
                            <Text style={styles.infoItemCor}>{color}</Text>
                        </View>
                    </View>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Duração</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>
                                {
                                    calcularDiferencaHoras(
                                        `${data_entrada} ${hora_entrada}`, 
                                        `${data_saida} ${hora_saida}`
                                    )
                                }
                            </Text>
                            <Text style={styles.infoItem}>
                                {`${data_entrada}\n ${hora_entrada}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Valor</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>{formatCurrency(value)}</Text>
                        </View>
                    </View>
                </View>
                <TouchableOpacity 
                    style={styles.botaoReserva} 
                    onPress={() => { 
                        navigation.navigate('Tempo de Espera', {
                            idDestination: id_establishment,
                            idReservation: id
                        })
                    }}>
                    <Text style={styles.textoBotao}>Acompanhar reserva</Text>
                </TouchableOpacity>
            </View>
        }
    </>
}

export default AcompanharReserva