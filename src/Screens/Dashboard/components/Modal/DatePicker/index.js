import { useContext, useEffect, useState } from "react"
import { Alert, TouchableOpacity } from 'react-native'
import { ReservaContext } from "../../../../../Context/reservaContext"
import { AreaView, BotaoFechar, BotaoSalvar, TextBotao } from "../style"
import { Feather } from "react-native-vector-icons"
import CalendarioDataHora from "../../CalendarioDataHora"

const DatePickerModal = (props) => {

    const { setModalConfirma, setModalDatePicker } = props
    const { setNovaReserva } = useContext(ReservaContext)

    const hoje = new Date()
    const [mesAtual, setMesAtual] = useState(hoje.getMonth())
    const [anoAtual, setAnoAtual] = useState(hoje.getFullYear())
    const [diaSelecionado, setDiaSelecionado] = useState(null)
    const [button, setButton] = useState("calendar")
    const [horarioEscolhido, setHorarioEscolhido] = useState("")

    const handleSave = () => {
        if (!diaSelecionado || !mesAtual || !anoAtual) {
            return Alert.alert("Erro", "Selecione uma data para agendar uma reserva")
        }

        if (!horarioEscolhido) {
            return Alert.alert("Erro", "Selecione um horário para agendar uma reserva")
        }

        const dataEntradaStr = `${diaSelecionado < 10 ? "0"+diaSelecionado : diaSelecionado}/${mesAtual < 9 ? "0"+(mesAtual+1) : mesAtual+1}/${anoAtual}`

        setModalConfirma(true)

        setNovaReserva({
            data_entrada: dataEntradaStr,
            hora_entrada: horarioEscolhido+":00"
        })
    }

    return (
        <AreaView>
            <BotaoFechar>
                <TouchableOpacity
                    onPress={() => setModalDatePicker(false)}
                    activeOpacity={0.7}
                >
                    <Feather name="x" color="#fff" size={30} />
                </TouchableOpacity>
            </BotaoFechar>
            <CalendarioDataHora
                states={{
                    button, setButton,
                    mesAtual, setMesAtual,
                    anoAtual, setAnoAtual,
                    diaSelecionado, setDiaSelecionado,
                    hoje, setHorarioEscolhido
                }}
            />
            <BotaoSalvar largura={90} onPress={handleSave}>
                <TextBotao>Salvar</TextBotao>
            </BotaoSalvar>
        </AreaView>
    )
}

export default DatePickerModal