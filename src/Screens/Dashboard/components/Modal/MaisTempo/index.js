import React, { useContext, useEffect, useState } from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { AreaView, BotaoFechar, BotaoSalvar, CampoDeTexto, Quantity, TextBotao } from "../style"
import RNPickerSelect from 'react-native-picker-select'
import { theme } from "../../../../../Theme"
import { ReservaContext } from "../../../../../Context/reservaContext"
import { preenchaValorPersonalizado } from "../../../../../Mocks/warnings"
import { Feather } from "react-native-vector-icons"

const { corPrimaria } = theme

const MaisTempo = (props) => {

    const { setModalMaisTempo, idDestination } = props
    const { setPersonalizado, setTabelaFixa, tabelaFixa, priceTable } = useContext(ReservaContext)

    const [quantity, setQuantity] = useState(1)
    const [value, setValue] = useState("")

    const items = [
        { label: 'Horas', value: 'horas' },
        { label: 'Dias', value: 'dias' },
        { label: 'Semana', value: 'semana' }
    ]

    function salvarItem() {
        if (value == "" || quantity <= 0) {
            alert(preenchaValorPersonalizado)
            return
        }

        const valorHora = priceTable?.valor_hora
        const valorFracaoHora = priceTable?.valor_fracao_hora

        let novoItem = {
            id: "personalizado",
            id_establishment: idDestination,
            value: 0, 
            primeira_hora: "",
            segunda_hora: ""
        }

        if (value === 'horas') {
            const valorPersonalizado = valorHora + (valorFracaoHora * (quantity - 1))

            novoItem.value = valorPersonalizado
            novoItem.segunda_hora = quantity.toString()
        } else if (value === 'dias') {
            const valorPersonalizado = valorHora + (valorFracaoHora * ((quantity * 24) - 1))

            novoItem.value = valorPersonalizado
            novoItem.segunda_hora = (quantity * 24).toString()
        } else if (value === 'semana') {
            const valorPersonalizado = valorHora + (valorFracaoHora * ((quantity * 24 * 7) - 1))

            novoItem.value = valorPersonalizado
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
            setTabelaFixa([novoItem, ...tabelaFixa])
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
            <BotaoFechar>
                <TouchableOpacity 
                    onPress={() => setModalMaisTempo(false)}
                    activeOpacity={0.7}
                >
                    <Feather name="x" color="#fff" size={30} />
                </TouchableOpacity>
            </BotaoFechar>

            <CampoDeTexto>
                <Quantity
                    value={quantity}
                    onChangeText={text => handleText(text)}
                    placeholder="Digite quanto tempo a mais"
                    keyboardType="numeric"
                />
                <RNPickerSelect
                    onValueChange={value => setValue(value)}
                    value={value}
                    items={items}
                    style={pickerSelectStyles}
                    placeholder={{
                        label: "Selecione um item"
                    }}
                    useNativeAndroidPickerStyle={false}
                    fixAndroidTouchableBug={true}
                    disabled={false}
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
    },
    placeholder: {
        // Estilo para o placeholder
        color: "#999",
        fontSize: 16,
    }
})

export default MaisTempo