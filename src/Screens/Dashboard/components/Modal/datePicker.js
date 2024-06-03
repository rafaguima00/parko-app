import React from "react";
import { View, TouchableOpacity, Text } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { theme } from "../../../../Theme";

const { fonteNegrito } = theme;

const DatePickerModal = ({ selectedDate, setSelectedDate, setModalConfirma }) => {

    return (
        <View style={{backgroundColor: 'rgba(84, 84, 84, 0.5)', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <DatePicker
                mode='datepicker'
                options={{
                    backgroundColor: 'rgb(244, 244, 244)',
                    textHeaderColor: '#509c76',
                    textDefaultColor: '#509c76',
                    mainColor: '#509c76',
                    textSecondaryColor: '#7d7d7d',
                    borderColor: '#509c76',
                    textHeaderFontSize: 19,
                    defaultFont: 'Roboto_700Bold',
                    headerFont: 'Roboto_700Bold'
                }}
                minimumDate="06/03/2023"
                minuteInterval={30}
                selectorStartingYear={2023}
                onSelectedChange={date => {setSelectedDate(date)}}
                selected={selectedDate}
                locale="en"
                style={{
                    width: '90%', 
                    height: '45%', 
                    borderTopLeftRadius: '30%',
                    borderTopRightRadius: '30%'
                }}
            />

            <TouchableOpacity 
                onPress={setModalConfirma}
                style={{
                    width: '90%',
                    backgroundColor: '#509c76',
                    height: 54,
                    borderBottomLeftRadius: '30%',
                    borderBottomRightRadius: '30%',
                    justifyContent: "center"
                }}>
                <Text style={{fontFamily: fonteNegrito, fontSize: 17, color: '#fff', textAlign: 'center'}}>Salvar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default DatePickerModal;