import Calendar from "../Calendar"
import { Background, ToggleButton, ToggleContainer, ToggleText } from "../Modal/style"
import Time from "../Time"

const CalendarioDataHora = (props) => {

    const {
        button, setButton,
        mesAtual, setMesAtual,
        anoAtual, setAnoAtual,
        diaSelecionado, setDiaSelecionado,
        hoje, setHorarioEscolhido
    } = props.states

    const setItem = (item) => {
        setButton(item)
    }

    return <>
        <Background>
            <ToggleContainer>
                <ToggleButton 
                    onPress={() => setItem("calendar")} 
                    activeOpacity={1}
                    selectedItem={button === "calendar" ? true : false}
                >
                    <ToggleText selectedItem={button === "calendar" ? true : false}>
                        Data
                    </ToggleText>
                </ToggleButton>
                <ToggleButton 
                    onPress={() => setItem("time")} 
                    activeOpacity={1}
                    selectedItem={button === "time" ? true : false}
                >
                    <ToggleText selectedItem={button === "time" ? true : false}>
                        Hora
                    </ToggleText>
                </ToggleButton>
            </ToggleContainer>
            {
                button === "calendar" ? 
                <Calendar 
                    states={{
                        mesAtual, setMesAtual,
                        anoAtual, setAnoAtual,
                        diaSelecionado, setDiaSelecionado,
                        hoje
                    }} 
                /> :
                <Time 
                    states={{
                        diaSelecionado, mesAtual,
                        anoAtual, setHorarioEscolhido,
                        hoje
                    }} 
                />
            }
        </Background>
    </>
}

export default CalendarioDataHora