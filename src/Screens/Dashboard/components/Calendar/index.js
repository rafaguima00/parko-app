import { theme } from "../../../../Theme"
import { Feather } from "react-native-vector-icons"
import { 
    BotaoSeta, 
    Dia, 
    DiasSemana, 
    DiaVazio, 
    GradeDias, 
    HeaderMes, 
    TextoDia, 
    TextoDiaSemana, 
    Titulo 
} from "../Modal/style"
import { useEffect } from "react"

const Calendar = (props) => {

    const {
        mesAtual, setMesAtual,
        anoAtual, setAnoAtual,
        diaSelecionado, setDiaSelecionado,
        hoje
    } = props.states
    const { corPrimaria } = theme
    
    const diasSemana = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    const meses = [
        'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 
        'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ]
    const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate()
    const primeiroDia = new Date(anoAtual, mesAtual, 1).getDay()

    const mudarMes = (incremento) => {
        let novoMes = mesAtual + incremento
        let novoAno = anoAtual

        if (novoMes < 0) {
            novoMes = 11
            novoAno -= 1
        } else if (novoMes > 11) {
            novoMes = 0
            novoAno += 1
        }

        setMesAtual(novoMes)
        setAnoAtual(novoAno)
        setDiaSelecionado(null)
    }

    const renderDias = () => {
        const dias = []

        // Dias vazios antes do 1º dia
        for (let i = 0; i < primeiroDia; i++) {
            dias.push(<DiaVazio key={`empty-${i}`}></DiaVazio>)
        }

        // Dias do mês
        for (let i = 1; i <= diasNoMes; i++) {
            
            hoje.setHours(0, 0, 0, 0)
            const dataAtual = new Date(anoAtual, mesAtual, i)
            dataAtual.setHours(0, 0, 0, 0)
        
            const desabilitado = dataAtual < hoje

            const selecionado = i === diaSelecionado
            dias.push(
                <Dia
                    key={i}
                    onPress={() => !desabilitado && setDiaSelecionado(i)}
                    activeOpacity={1}
                    disabled={desabilitado}
                >
                    <TextoDia desabilitado={desabilitado} textoSelecionado={selecionado ? true : false}>
                        {i}
                    </TextoDia>
                </Dia>
            )
        }

        return dias
    }

    return <>
        {/* Header mês */}
        <HeaderMes>
            <BotaoSeta 
                onPress={() => mudarMes(-1)}
                activeOpacity={1}
            >
                <Feather name="arrow-left" size={20} color={corPrimaria} />
            </BotaoSeta>
            <Titulo>
                {meses[mesAtual]}, {anoAtual}
            </Titulo>
            <BotaoSeta 
                onPress={() => mudarMes(1)}
                activeOpacity={1}
            >
                <Feather name="arrow-right" size={20} color={corPrimaria} />
            </BotaoSeta>
        </HeaderMes>

        {/* Dias da semana */}
        <DiasSemana>
            {diasSemana.map((dia, index) => (
                <TextoDiaSemana key={index}>{dia}</TextoDiaSemana>
            ))}
        </DiasSemana>

        {/* Dias */}
        <GradeDias>{renderDias()}</GradeDias>
    </>
}

export default Calendar