import RNPickerSelect from 'react-native-picker-select'
import { Feather } from "react-native-vector-icons"
import { 
    AreaView, 
    BotaoFechar, 
    BotaoSalvar, 
    CampoDeTexto, 
    Subtitle, 
    TextBotao,
    TextPage
} from './style'
import { useState } from 'react'
import { Alert, TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { theme } from '../../../Theme'
import api from '../../../Services/api'
import { STATUS_APP, ACCESS_TOKEN } from "@env"
import LoadingModal from "../../../Components/Loading"

const { corPrimaria } = theme

const ModalCancelarReserva = ({ setModalCancelarReserva, id }) => {

    const [value, setValue] = useState("")
    const [loading, setLoading] = useState(false)

    const items = [
        { label: 'Ocupação indevida', value: 'ocupação' },
        { label: 'Cobrança indevida', value: 'cobrança' },
        { label: 'Distante do local', value: 'distante' },
        { label: 'Avaliação ruim', value: 'avaliação' },
        { label: 'Preço', value: 'preço' },
        { label: 'Outros', value: 'outros' }
    ]

    const salvarReembolsoNoBanco = async (refunds, id_reservation) => {
        try {
            const response = await api.put(
                `/update-payment-on-db`, 
                {
                    value_refunded: refunds.amount, 
                    id_payment: refunds.payment_id, 
                    id_reservation
                }
            )

            setModalCancelarReserva(false)
        } catch (error) {
            console.log(error.response.data)
        }
    }

    const criarReembolso = async (payment) => {
        setLoading(true)

        const amount = (payment.value_paid * 0.8).toFixed(2)
        
        try {
            const response = await api.post(
                `/payment/${payment.id_payment}/refunds`, 
                {
                    amount: Number(amount),
                    id_reservation: payment.id_reservation
                }
            )

            Alert.alert(
                "Reembolso solicitado",
                "Seu reembolso está sendo processado. Você será notificado quando for concluído."
            )

            if (response.data.status === "approved") {
                salvarReembolsoNoBanco(
                    response.data, 
                    payment.id_reservation
                )
            }
        } catch (error) {
            Alert.alert(
                "Erro ao solicitar reembolso",
                error.response.data.error.message
            )
        } finally {
            setLoading(false)
        }
    }

    const carregarIdPagamento = async () => {

        await api.get(`/search-payment/${id}`)
            .then(res => {
                Alert.alert(
                    "Tem certeza que deseja cancelar a reserva?",
                    "Ao cancelar a reserva, você será reembolsado(a) com até 80% do valor da reserva",
                    [
                        {
                            text: 'OK',
                            onPress: () => criarReembolso(res.data[0])
                        },
                        {
                            text: 'Cancelar'
                        }
                    ]
                )
            })
            .catch(e => {
                Alert.alert(e.response)
            })
    }

    return <>
        <LoadingModal loading={loading} />
        <AreaView>
            <BotaoFechar>
                <TouchableOpacity 
                    onPress={() => setModalCancelarReserva(false)}
                    activeOpacity={0.7}
                >
                    <Feather name="x" color="#fff" size={30} />
                </TouchableOpacity>
            </BotaoFechar>

            <CampoDeTexto>
                <TextPage>Cancelar Reserva</TextPage>
                <Subtitle>Selecione o motivo do cancelamento</Subtitle>
                <RNPickerSelect
                    onValueChange={value => setValue(value)}
                    value={value}
                    items={items}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: "Selecionar"
                    }}
                    //useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    disabled={false}
                />
            </CampoDeTexto>

            <BotaoSalvar 
                onPress={carregarIdPagamento}
                activeOpacity={0.7}
            >
                <TextBotao>Cancelar</TextBotao>
            </BotaoSalvar>
        </AreaView>
    </>
}

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        // Estilo para iOS
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: corPrimaria,
        borderRadius: 40,
        color: "black",
        paddingRight: 30, // Alinha o ícone
        marginHorizontal: 36
    },
    inputAndroid: {
        // Estilo para Android
        fontSize: 16,
        paddingHorizontal: 10,
        paddingVertical: 8,
        borderWidth: 1,
        borderColor: corPrimaria,
        borderRadius: 40,
        color: "black",
        paddingRight: 30, // Alinha o ícone
    },
    placeholder: {
        // Estilo para o placeholder
        color: "#999",
        fontSize: 16,
    }
})

export default ModalCancelarReserva