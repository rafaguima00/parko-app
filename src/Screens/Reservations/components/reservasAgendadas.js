import { View, Image, Text, Modal } from "react-native"
import { BotaoReserva, EstadoReserva, styles, TextoBotao } from "../style"
import { formatCurrency } from "../../../Services/formatCurrency"
import { theme } from "../../../Theme"
import { useState } from "react"
import ModalCancelarReserva from "../modal/cancelarReserva"

const ReservasAgendadas = ({ item }) => {

    const { corVermelha, corPrimaria } = theme

    const [modalCancelarReserva, setModalCancelarReserva] = useState(false)

    function abrirModal() {
        setModalCancelarReserva(true)
    }

    return <>
        <View>
            <EstadoReserva>Reserva Agendada</EstadoReserva>
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
                        <Text style={styles.textoInicio}>Entrada Prevista</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>
                                {`${item.data_entrada}\n ${item.hora_entrada}`}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.infoVeiculo}>
                        <Text style={styles.textoInicio}>Saída Prevista</Text>
                        <View style={styles.textoVeiculo}>
                            <Text style={styles.infoItem}>
                                {`${item.data_saida}\n ${item.hora_saida}`}
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
                    onPress={abrirModal}
                    activeOpacity={0.7}
                    background={corVermelha}
                >
                    <TextoBotao>Cancelar reserva</TextoBotao>
                </BotaoReserva>
            </View>
        </View>
        <Modal
            visible={modalCancelarReserva}
            animationType="fade"
            onRequestClose={() => {}}
            transparent={true}
        >
            <ModalCancelarReserva setModalCancelarReserva={setModalCancelarReserva} />
        </Modal>
    </>
}

export default ReservasAgendadas