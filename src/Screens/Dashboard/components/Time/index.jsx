import { useContext, useEffect, useState } from "react"
import { ReservaContext } from "../../../../Context/reservaContext"
import LoadingModal from "../../../../Components/Loading"
import { ButtonTime, TextButtonTime, TextEmpty } from "../Modal/style"
import { FlatList } from "react-native"
import { emptyOpeningHour } from "../../../../Mocks/emptyList"

const Time = (props) => {

    const {
        diaSelecionado, mesAtual,
        anoAtual, setHorarioEscolhido,
        hoje
    } = props.states
    const { horaFuncionamento } = useContext(ReservaContext)

    const [loading, setLoading] = useState(false)
    const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
    const [clicked, setClicked] = useState(null)

    const diasSemana = {
        mon: "Segunda-feira",
        tue: "Terça-feira",
        wed: "Quarta-feira",
        thu: "Quinta-feira",
        fri: "Sexta-feira",
        sat: "Sábado",
        sun: "Domingo"
    }

    function carregarDados() {

        const horarios = []
        
        if (!horaFuncionamento) {
            setLoading(true)
        }

        const dataSelecionada = diaSelecionado ? new Date(`${anoAtual}-${mesAtual+1}-${diaSelecionado}`) : new Date()
        const nomeDia = diasSemana[new Date(dataSelecionada).toString().split(" ")[0].toLowerCase()]
        const funcionamentoDoDia = horaFuncionamento.find(
            item => item.dia_semana.toLowerCase() === nomeDia.toLowerCase()
        )

        const isHoje = (
            dataSelecionada.getDate() === hoje.getDate() &&
            dataSelecionada.getMonth() === hoje.getMonth() &&
            dataSelecionada.getFullYear() === hoje.getFullYear()
        )
        
        if (!funcionamentoDoDia) {
            setHorariosDisponiveis([])
            setLoading(false)
            return
        }

        const horaAbertura = funcionamentoDoDia.hora_abertura
        const horaFechamento = funcionamentoDoDia.hora_fechamento

        const toMinutes = (horaStr) => {
            const [h, m, s] = horaStr.split(":").map(Number)
            return h * 60 + m
        }

        const aberturaMin = toMinutes(horaAbertura)
        const fechamentoMin = toMinutes(horaFechamento)

        let horarioAtual = 0

        if (isHoje) {
            const agora = new Date()
            agora.setMinutes(agora.getMinutes() + 10)
            const hora = agora.getHours().toString().padStart(2, "0")
            const min = agora.getMinutes().toString().padStart(2, "0")
            horarioAtual = toMinutes(`${hora}:${min}`)
        }

        for (let i = 0; i < 24; i += 0.5) {
            let hora = Math.floor(i)
            let minutos = (i % 1 === 0) ? '00' : '30'

            const horarioStr = {
                id: i,
                hora: `${hora.toString().padStart(2, '0')}:${minutos}`
            }

            const totalMin = toMinutes(horarioStr?.hora)

            const dentroDoHorario = totalMin >= aberturaMin && totalMin <= fechamentoMin

            if (dentroDoHorario && (!isHoje || totalMin > horarioAtual)) {
                horarios.push(horarioStr)
            }
        }

        setHorariosDisponiveis(horarios)
        setLoading(false)
    }

    function clicado(item) {
        const { id, hora } = item

        setClicked(id.toString())
        setHorarioEscolhido(hora)
    }

    const renderItem = (item, index) => {
        return <>
            <ButtonTime 
                activeOpacity={1} 
                onPress={() => clicado(item)}
                clicked={clicked === item.id.toString() ? true : false}
                marginright={(index + 1) % 3 === 0 ? 0 : 10}    
            >
                <TextButtonTime
                    clicked={clicked === item.id.toString() ? true : false}
                >
                    {item.hora}
                </TextButtonTime>
            </ButtonTime>
        </>
    }

    const ListEmptyMessage = () => {
        return <>
            <TextEmpty>{emptyOpeningHour}</TextEmpty>
        </>
    }

    useEffect(() => {
        if (horaFuncionamento) {
            carregarDados()
        }
    }, [horaFuncionamento, diaSelecionado])

    return <>
        <FlatList 
            data={horariosDisponiveis}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => renderItem(item, index)}
            contentContainerStyle={{
                justifyContent: "flex-start",
                margin: 20
            }}
            numColumns={3}
            ListEmptyComponent={ListEmptyMessage}
        />
        <LoadingModal loading={loading} />
    </>
}

export default Time