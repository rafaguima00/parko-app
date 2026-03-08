import React, { useContext, useEffect } from "react"
import { View, Text, Image, StyleSheet } from 'react-native'
import { theme } from "../../../Theme"
import { Botao } from "../../../Components/Botao"
import { reservaConfirmada } from "../../../Mocks/confirmed"
import { ReservaContext } from "../../../Context/reservaContext"

const { corPrimaria, fonteNegrito } = theme

export default function ModalConfirmacao({ handleClose, estenderTempo, findReservation }) {

    const { setNovaReserva, novaReserva, itemPreSelecionado } = useContext(ReservaContext)

    // Pegar a data e hora de saída em milissegundos e somar com o valor selecionado em milissegundos
    function mensagemConfirmacao() {

        // Converter dd/mm/yyyy para yyyy-mm-dd
        const dataSaida = findReservation[0].data_saida
        const [day, month, year] = dataSaida.split('/') 

        // Após a conversão de data e cálculo do tempo de saída, converter o resultado para o formato correto
        const horaDaSaidaEmMilissegundos = new Date(`${year}-${month}-${day} ${findReservation[0].hora_saida}`).getTime()

        // Retornar data e hora de saída no formato padrão
        const dataHoraSaida = new Date(horaDaSaidaEmMilissegundos + (itemPreSelecionado.hora_saida * 1000)).toLocaleString("pt-br")

        // Separar data e hora de saída
        let dataHoraDeSaida = dataHoraSaida.replace(",", "").split(" ") 

        setNovaReserva({
            data_saida: dataHoraDeSaida[0],
            hora_saida: dataHoraDeSaida[1],
            value: Number(itemPreSelecionado.value.toFixed(2))
        })
    }

    useEffect(() => {
        if(novaReserva) {
            estenderTempo(novaReserva)
        }
    }, [novaReserva])

    return (
        <View style={estilos.modalContainer}>
            <View style={estilos.modalContent}>
                <View style={estilos.confirmacao}>
                    <Image source={require('../../../../assets/checked.png')} />
                    <Text style={estilos.tituloConfirmacao}>Confirmação</Text>
                    <Text style={estilos.mensagemConfirmacao}>
                        {reservaConfirmada}
                    </Text>
                </View>
                <View style={{alignItems: 'center', gap: 12}} >
                    <Botao 
                        children={"Concordo"}
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={mensagemConfirmacao}
                    />
                    <Botao 
                        children={"Não concordo"}
                        corDeFundo={'#ff4a4a'}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={handleClose}
                    />
                </View>
            </View>
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