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
import { TouchableOpacity } from 'react-native'
import { StyleSheet } from 'react-native'
import { theme } from '../../../Theme'

const { corPrimaria } = theme

const ModalCancelarReserva = ({ setModalCancelarReserva }) => {

    const [value, setValue] = useState("")

    const items = [
        { label: 'Ocupação indevida', value: 'ocupação' },
        { label: 'Cobrança indevida', value: 'cobrança' },
        { label: 'Distante do local', value: 'distante' },
        { label: 'Avaliação ruim', value: 'avaliação' },
        { label: 'Preço', value: 'preço' },
        { label: 'Outros', value: 'outros' }
    ]

    return <>
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
                onPress={() => {}}
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