import api from "../../../Services/api"
import { theme } from "../../../Theme"
import { 
    BtRating, 
    Div, 
    FeedBackSent, 
    Quit, 
    styles, 
    TextArea, 
    TextFeedback, 
    TxtButton, 
    TxtQuit 
} from "../style"
import { useUser } from "../../../Context/dataUserContext"
import { useContext, useState } from "react"
import { ReservaContext } from "../../../Context/reservaContext"
import { feedbackSent } from "../../../Mocks/confirmed"
import { feedbackNotSent } from "../../../Mocks/errorOrRejected"
import { formatCurrency } from "../../../Services/formatCurrency"
import { View, Image, Text, TouchableOpacity } from "react-native"

const ReservationsList = ({ item, setLoading, userReservations }) => {

    const { corPrimaria, fonteNegrito } = theme
    const { dataUser } = useUser()
    const { setReservations } = useContext(ReservaContext)

    const [feedback, setFeedback] = useState(null) // Id da reserva
    const [avaliacao, setAvaliacao] = useState(null) // Nota da avaliação
    const [botaoClicado, setBotaoClicado] = useState({}) 
    const [comments, setComments] = useState("")
    const [idEstablishment, setIdEstablishment] = useState(null)

    const rate = [1, 2, 3, 4, 5]
    
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

    return <>
        {(item.status == "Confirmado" || item.status == "Recusado") &&
            <View>
                <Text>
                    Reserva em Andamento
                </Text>
            </View>
        }
        {item.status == "Pendente" &&
            <View>
                <Text>
                    Reserva Agendada
                </Text>
            </View>
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

export default ReservationsList