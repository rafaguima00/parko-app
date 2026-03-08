import React, { useContext, useEffect, useState } from "react"
import { StyleSheet } from "react-native"
import { AreaView, BotaoFecharModal, BotaoSalvar, CampoDeTexto, Quantity, TextBotao } from "../../style"
import RNPickerSelect from 'react-native-picker-select'
import { theme } from "../../../../Theme"
import { ReservaContext } from "../../../../Context/reservaContext"
import { valorPersonalizado } from "../../../../Mocks/warnings"

const { corPrimaria } = theme

const ModalMaisTempo = (props) => {

    const { setModalMaisTempo, idDestination } = props
    const { setPersonalizado, setTabelaFixa, tabelaFixa } = useContext(ReservaContext)

    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState("")

    const items = [
        { label: 'Horas', value: 'horas' },
        { label: 'Dias', value: 'dias' },
        { label: 'Semana', value: 'semana' }
    ]

    function salvarItem() {
        if (value == "" || quantity <= 0) {
            alert(valorPersonalizado)
            return
        }

        const valorDia = 10 * 24
        const valorSemana = valorDia * 7

        let novoItem = {
            id: "personalizado",
            id_establishment: idDestination,
            value: 0,
            primeira_hora: "",
            segunda_hora: ""
        }

        if (value === 'horas') {
            novoItem.value = 10 * quantity
            novoItem.segunda_hora = quantity.toString()
        } else if (value === 'dias') {
            novoItem.value = valorDia * quantity
            novoItem.segunda_hora = (quantity * 24).toString()
        } else if (value === 'semana') {
            novoItem.value = valorSemana * quantity
            novoItem.segunda_hora = (quantity * 24 * 7).toString()
        }

        // Verificar se já existe um item personalizado
        const existePersonalizado = tabelaFixa.some(item => item.id === "personalizado")

        if (existePersonalizado) {
            // Substituir o item personalizado
            const novaTabelaFixa = tabelaFixa.map(item => 
                item.id === "personalizado" ? novoItem : item
            )
            setTabelaFixa(novaTabelaFixa)
        } else {
            // Adicionar um novo item personalizado
            setTabelaFixa([...tabelaFixa, novoItem])
        }

        setModalMaisTempo(false)
    }

    function handleText(text) {

        // Filtra apenas números inteiros
        const sanitizedText = text.replace(/[^0-9]/g, "")
        setQuantity(Number(sanitizedText))
    }

    useEffect(() => {
        setPersonalizado(true)
    }, [tabelaFixa])

    return <>
        <AreaView>
            <BotaoFecharModal 
                onPress={() => setModalMaisTempo(false)}
            >
                <TextBotao>X</TextBotao>
            </BotaoFecharModal>

            <CampoDeTexto>
                <Quantity
                    value={quantity}
                    onChangeText={text => handleText(text)}
                    placeholder="Digite quanto tempo a mais..."
                />
                <RNPickerSelect
                    onValueChange={value => setValue(value)}
                    value={value}
                    items={items}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: "Selecione um item..."
                    }}
                />
            </CampoDeTexto>

            <BotaoSalvar onPress={salvarItem}>
                <TextBotao>Salvar</TextBotao>
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
        marginHorizontal: 36
    },
    placeholder: {
        // Estilo para o placeholder
        color: "#999",
        fontSize: 16,
    }
})

export default ModalMaisTempo