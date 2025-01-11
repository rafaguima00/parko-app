import React, { useContext, useEffect, useState } from "react"
import { Feather } from "react-native-vector-icons"
import { 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    FlatList,
    Modal,
    ActivityIndicator
} from "react-native"
import { theme } from "../../Theme"
import { 
    BtRating, 
    Div, 
    Quit, 
    styles, 
    TextArea, 
    TxtButton, 
    TxtQuit,
    FeedBackSent,
    TextFeedback
} from "./style"
import ReadApi from "../../Services/readData"
import { ReservaContext } from "../../Context/reservaContext"
import { useUser } from "../../Context/dataUserContext"
import { formatCurrency } from "../../Services/formatCurrency"
import { emptyReservation } from "../../Mocks/emptyList"
import { selectRate } from "../../Mocks/warnings"
import api from "../../Services/api"
import { feedbackSent } from "../../Mocks/confirmed"
import { feedbackNotSent } from "../../Mocks/errorOrRejected"

export default function Reservations({ navigation }) {

    const { fonteNegrito, corPrimaria } = theme
    const { loadReservations } = ReadApi()
    const { reservations, setReservations } = useContext(ReservaContext)
    const { dataUser } = useUser()

    const [feedback, setFeedback] = useState(null) // Id da reserva
    const [avaliacao, setAvaliacao] = useState(null) // Nota da avaliação
    const [botaoClicado, setBotaoClicado] = useState({}) 
    const [comments, setComments] = useState("")
    const [idEstablishment, setIdEstablishment] = useState(null)
    const [loading, setLoading] = useState(false)

    const rate = [1, 2, 3, 4, 5]

    const userReservations = reservations.filter(item => item.id_costumer == dataUser.id)

    function handleClick(itemId, rating) {
        setBotaoClicado({ 
            [itemId]: rating 
        })
        setAvaliacao(rating)
    }

    function selectFeedback(item) {
        setIdEstablishment(item.id_establishment)
        setFeedback(item.id)
    }

    async function sendFeedback(itemId) {
        setLoading(true)

        if(!itemId) {
            alert(selectRate)
            setLoading(false)

            return
        }

        await api.post("/ratings", {
            id_costumer: dataUser.id, 
            id_establishment: idEstablishment, 
            id_reservation: feedback,
            rate: avaliacao, 
            comments: comments
        })
        .then(() => {
            alert(feedbackSent)

            const updatedReservations = userReservations.map(item =>
                item.id === feedback ? { ...item, rated: avaliacao } : item
            )
            setReservations(updatedReservations)
            setFeedback(null)
        })
        .catch(e => {
            alert(feedbackNotSent + e)
        })
        .finally(() => {
            setLoading(false)
        })
    }

    useEffect(() => {
        loadReservations()
    }, [])

    const renderItem = ({ item }) => {
        return <>
            {(item.status == "Confirmado" || item.status == "Recusado") &&
                <View>Reserva em Andamento</View>
            }
            {item.status == "Pendente" &&
                <View>Reserva Agendada</View>
            }
            {item.status == "Finalizado" &&
                <View>
                    <View style={styles.itemLista}>
                        <View style={styles.viewEstacionamento}>
                            <Image source={item.image} />
                            <Text style={styles.nomeEstacionamento}>{item.establishment}</Text>
                        </View>
                        {feedback === item.id && 
                            <Quit 
                                activeOpacity={0.9}
                                onPress={() => setFeedback(false)}
                            >
                                <TxtQuit>x</TxtQuit>
                            </Quit>
                        }
                        {feedback === item.id ? 
                            <Div>
                                <TextArea 
                                    editable
                                    multiline
                                    numberOfLines={4}
                                    placeholder="Escreva uma reclamação aqui"
                                    value={comments}
                                    onChangeText={text => setComments(text)}
                                />
                            </Div> :
                            <View style={styles.infoReserva}>
                                <View style={styles.entrada}>
                                    <Text style={styles.infoEntrada}>Entrada</Text>
                                    <View style={styles.horaEntrada}>
                                        <Text style={styles.infoData}>{item.data_entrada}</Text>
                                        <Text style={styles.infoData}>{item.hora_entrada}</Text>
                                    </View>
                                </View>
                                <View style={styles.entrada}>
                                    <Text style={styles.infoEntrada}>Saída</Text>
                                    <View style={styles.horaEntrada}>
                                        <Text style={styles.infoData}>{item.data_saida}</Text>
                                        <Text style={styles.infoData}>{item.hora_saida}</Text>
                                    </View>
                                </View>
                                <View style={styles.entrada}>
                                    <Text style={styles.infoEntrada}>Valor</Text>
                                    <Text style={styles.infoData}>{formatCurrency(item.value)}</Text>
                                </View>
                            </View>
                        }
                        <View style={styles.areaAvaliacao}>
                            <Text style={styles.textoReserva}>Avalie essa reserva</Text>
                            <View style={styles.agrupar}>
                                {rate.map(rating => (
                                    <BtRating
                                        activeOpacity={0.9}
                                        onPress={() => handleClick(item.id, rating)}
                                        background={
                                            botaoClicado[item.id] === rating || item.rated === rating ? corPrimaria : "#D9D9D9"
                                        }
                                        disabled={item.rated ? true : false}
                                    >
                                        <TxtButton 
                                            textcolor={
                                                botaoClicado[item.id] === rating || item.rated === rating ? "#EFEFEF" : "#9D9A96"
                                            }
                                        >
                                            {rating}
                                        </TxtButton>
                                    </BtRating>
                                ))}
                            </View>
                        </View>
                        {item.rated === null ? 
                            <TouchableOpacity 
                                style={styles.botao}
                                onPress={() => feedback === item.id ? sendFeedback(botaoClicado[item.id]) : selectFeedback(item)}
                                activeOpacity={0.7}
                            >
                                <Text 
                                    style={{ 
                                        fontSize: 17, 
                                        textAlign: 'center', 
                                        fontFamily: fonteNegrito, 
                                        color: "#fff" 
                                    }}
                                >
                                    {feedback === item.id ? "Enviar reclamação" : "Faça uma reclamação"}
                                </Text>
                            </TouchableOpacity> : 
                            <FeedBackSent>
                                <TextFeedback>{feedbackSent}</TextFeedback>
                            </FeedBackSent>
                        }
                    </View>
                </View>
            }
        </>
    }

    const EmptyListMessage = () => {
        return (
            <View>
                <Text style={styles.reservaVazio}>{emptyReservation}</Text>
            </View>
        )
    }

    return (
        <View style={styles.areaContent}>
            <View style={styles.cabecalho}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack()
                }}>
                    <Feather name="arrow-left" size={32}/>
                </TouchableOpacity>
                <Text style={styles.topoReservas}>Reservas</Text>
            </View>
            <FlatList 
                data={userReservations}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
                showsVerticalScrollIndicator={false}
            />
            <Modal
                visible={loading}
                transparent={true}
                onRequestClose={() => { }}
                animationType='fade'
            >
                <View
                    style={{
                        backgroundColor: 'rgba(125, 125, 125, 0.6)',
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <ActivityIndicator size={'small'} color={'#fff'} />
                </View>
            </Modal> 
        </View>
    )
}