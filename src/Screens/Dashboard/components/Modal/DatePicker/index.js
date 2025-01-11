import React, { useContext, useEffect, useState } from "react"
import { Alert } from 'react-native'
import DatePicker from 'react-native-modern-datepicker'
import { theme } from "../../../../../Theme"
import { ReservaContext } from "../../../../../Context/reservaContext"
import { AreaView, BotaoFechar, BotaoSalvar, TextBotao } from "../style"

const DatePickerModal = (props) => {

    const {
        setModalConfirma,
        setModalDatePicker
    } = props
    const { fonteNegrito, corPrimaria } = theme
    const { setNovaReserva } = useContext(ReservaContext)

    const [selected, setSelected] = useState({})

    const formatDate = (dateString) => {
        const [year, month, day] = dateString.split("/")

        setSelected({ ...selected, date: `${day}/${month}/${year}` })
    }

    const handleSave = (dateString, timeString) => {
        if(!dateString || !timeString) {
            return Alert.alert("Aviso", "Selecione uma data e horário")
        }

        setModalConfirma(true)

        setNovaReserva({
            data_entrada: dateString,
            hora_entrada: timeString+":00"
        })
    }

    const today = new Date()
    const date = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()
    const converterData = year + "-" + (month < 10 ? "0"+month : month) + "-" + (date < 10 ? "0"+date : date)

    return (
        <AreaView>
            <BotaoFechar 
                onPress={() => setModalDatePicker(false)}
            >
                <TextBotao>X</TextBotao>
            </BotaoFechar>

            {/* 
                Consultar propriedades na documentação: https://www.npmjs.com/package/@types/react-native-modern-datepicker
            */}
            <DatePicker
                locale="pt"
                mode="datepicker"
                options={{
                    backgroundColor: "rgb(244, 244, 244)",
                    textHeaderColor: corPrimaria,
                    textDefaultColor: corPrimaria,
                    mainColor: corPrimaria,
                    textSecondaryColor: "#7d7d7d",
                    borderColor: corPrimaria,
                    textHeaderFontSize: 19,
                    defaultFont: fonteNegrito,
                    headerFont: fonteNegrito
                }}
                onTimeChange={time => setSelected({ ...selected, time })}
                onDateChange={date => formatDate(date)}
                minimumDate={converterData}
                minuteInterval={5}
                selectorStartingYear={year}
                selected={selected}
                style={{
                    height: "45%", 
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}
            />

            <BotaoSalvar onPress={() => handleSave(selected.date, selected.time)}>
                <TextBotao>Salvar</TextBotao>
            </BotaoSalvar>
        </AreaView>
    )
}

export default DatePickerModal