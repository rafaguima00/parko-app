import React, { useContext, useEffect, useState } from "react"
import { View, Text, Image, StyleSheet } from 'react-native'
import { theme } from "../../../../../Theme"
import { Botao } from "../../../../../Components/Botao"
import { ReservaContext } from "../../../../../Context/reservaContext"
import LoadingModal from "../../../../../Components/Loading"
import { reservaConfirmada } from "../../../../../Mocks/confirmed"

const { fonteNegrito, corPrimaria } = theme

function ModalConfirmacao({ 
    handleClose, 
    confirmaReserva,
    loading
}) {

    const { 
        setNovaReserva, 
        novaReserva,
        distanceMatrix,
        tipoReserva,
        itemPreSelecionado
    } = useContext(ReservaContext)

    function confirmarVaga() {
        if(tipoReserva == "now") {
            const dataDeHoje = new Date().getTime() // Tempo atual em milissegundos
            const dataHoraEntrada = new Date(dataDeHoje + (distanceMatrix * 1000) + 600000).toLocaleString("pt-br") // Tempo atual no formato padrão
            let dataHoraDeEntrada = dataHoraEntrada.replace(",", "").split(" ") // Separar data e hora de entrada

            // Converter dd/mm/yyyy para yyyy-mm-dd
            const [day, month, year] = dataHoraDeEntrada[0].split('/') 

            // Após a conversão de data e cálculo do tempo de chegada, converter o resultado para o formato correto
            const horaAtualEmMilissegundos = new Date(`${year}-${month}-${day} ${dataHoraDeEntrada[1]}`).getTime()

            // Retornar data e hora de saída no formato padrão
            const dataHoraSaida = new Date(horaAtualEmMilissegundos + (itemPreSelecionado.hora_saida * 1000)).toLocaleString("pt-br")

            // Separar data e hora de saída
            let dataHoraDeSaida = dataHoraSaida.replace(",", "").split(" ") 

            setNovaReserva({
                ...novaReserva,
                data_entrada: dataHoraDeEntrada[0],
                hora_entrada: dataHoraDeEntrada[1],
                data_saida: dataHoraDeSaida[0],
                hora_saida: dataHoraDeSaida[1],
                value: Number(itemPreSelecionado.value.toFixed(2))
            })
        }

        if(tipoReserva == "schedule") {
            const dataHoraEntrada = `${novaReserva.data_entrada}, ${novaReserva.hora_entrada}`
            let dataHoraDeEntrada = dataHoraEntrada.replace(",", "").split(" ") // Separar data e hora de entrada

            // Converter dd/mm/yyyy para yyyy-mm-dd
            const [day, month, year] = dataHoraDeEntrada[0].split('/') 

            // Após a conversão de data e cálculo do tempo de chegada, converter o resultado para o formato correto
            const horaAtualEmMilissegundos = new Date(`${year}-${month}-${day} ${dataHoraDeEntrada[1]}`).getTime()

            // Retornar data e hora de saída no formato padrão
            const dataHoraSaida = new Date(horaAtualEmMilissegundos + (itemPreSelecionado.hora_saida * 1000)).toLocaleString("pt-br")

            // Separar data e hora de saída
            let dataHoraDeSaida = dataHoraSaida.replace(",", "").split(" ") 

            setNovaReserva({
                ...novaReserva,
                data_saida: dataHoraDeSaida[0],
                hora_saida: dataHoraDeSaida[1],
                value: Number(itemPreSelecionado.value.toFixed(2))
            })
        }
    }

    useEffect(() => {
        if(novaReserva.value) {
            confirmaReserva()
        }
    }, [novaReserva.value])

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao} >
                    <Image source={require('../../../../../../assets/checked.png')} />
                    <Text style={estilos.tituloConfirmacao}>Confirmação</Text>
                    <Text style={estilos.mensagemConfirmacao}>
                        {reservaConfirmada}
                    </Text>
                </View>
                <View style={{ alignItems: 'center', gap: 12 }}>
                    <Botao 
                        children="Concordo"
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={confirmarVaga}
                    />
                    <Botao 
                        children="Não concordo"
                        corDeFundo={'#ff4a4a'}
                        largura={'100%'}
                        negrito
                        corDoTexto={'#fff'}
                        aoPressionar={handleClose}
                    />
                </View>
            </View>
            <LoadingModal loading={loading} />
        </View>
    )
}  

const estilos = StyleSheet.create({
    modalContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(84, 84, 84, 0.25)'
    },
    modalContent: {
        gap: 20
    },
    confirmacao: {
        justifyContent:'center', 
        alignItems: 'center', 
        width: 300, 
        height: 240, 
        backgroundColor: 'white',
        borderRadius: 25
    },
    tituloConfirmacao: {
        fontSize: 24,
        fontFamily: fonteNegrito,
        lineHeight: 26,
        paddingTop: 15,
        color: '#523499'
    },
    mensagemConfirmacao: {
        textAlign: 'center', 
        fontFamily: 'Roboto_400Regular',
        fontSize: 15,
        color: '#545454',
        lineHeight: 18,
        padding: 18
    }
})

export default ModalConfirmacao