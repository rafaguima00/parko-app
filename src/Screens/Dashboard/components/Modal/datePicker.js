import React, { useContext, useEffect } from "react";
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { theme } from "../../../../Theme";
import { ReservaContext } from "../../../../Context/reservaContext";

const { fonteNegrito } = theme;

const DatePickerModal = ({ 
    selectedDate, 
    setSelectedDate, 
    setModalConfirma,
}) => {

    const { setHoraReserva } = useContext(ReservaContext)

    const handleSave = () => {
        if(selectedDate === "") {
            return Alert.alert("Aviso", "Selecione uma data e horário")
        }

        setModalConfirma(true)
        
        const splitItem = selectedDate.split(" ")
        const date = splitItem[0]
        const clock = splitItem[1]

        setHoraReserva(splitItem)
    }

    const today = new Date().toLocaleDateString()
    const year = new Date().getFullYear()

    return (
        <View style={{backgroundColor: "rgba(84, 84, 84, 0.5)", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <DatePicker
                mode="datepicker"
                options={{
                    backgroundColor: "rgb(244, 244, 244)",
                    textHeaderColor: "#509c76",
                    textDefaultColor: "#509c76",
                    mainColor: "#509c76",
                    textSecondaryColor: "#7d7d7d",
                    borderColor: "#509c76",
                    textHeaderFontSize: 19,
                    defaultFont: "Roboto_700Bold",
                    headerFont: "Roboto_700Bold"
                }}
                minimumDate={today}
                minuteInterval={5}
                selectorStartingYear={year}
                onSelectedChange={date => {setSelectedDate(date)}}
                selected={selectedDate}
                locale="pt-br"
                style={{
                    width: "90%", 
                    height: "45%", 
                    borderTopLeftRadius: 30,
                    borderTopRightRadius: 30
                }}
            />

            <TouchableOpacity 
                onPress={handleSave}
                style={{
                    width: "90%",
                    backgroundColor: "#509c76",
                    height: 54,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                    justifyContent: "center"
                }}>
                <Text style={{fontFamily: fonteNegrito, fontSize: 17, color: "#fff", textAlign: "center"}}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DatePickerModal;