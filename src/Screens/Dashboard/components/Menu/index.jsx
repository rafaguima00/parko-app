import { useContext, useEffect, useState } from "react"
import { ScrollView, View, Text, FlatList } from "react-native"
import { Feather, MaterialCommunityIcons } from "react-native-vector-icons"
import { Botao } from "../../../../Components/Botao"
import { BotaoClicar, MaisTempo, styles, TextBlue, TextLine } from "./style"
import { theme } from "../../../../Theme"
import { ReservaContext } from "../../../../Context/reservaContext"
import api from "../../../../Services/api"
import LoadingModal from "../../../../Components/Loading"
import ListaDePrecos from "./components/listaDePrecos"
import { STATUS_APP } from "@env"

const Menu = ({ 
    setModalDatePicker, 
    setInformacoes,
    setEscolherVeiculo,
    setModalMaisTempo,
    loading,
    setLoading
}) => {

    const [botaoAtivo, setBotaoAtivo] = useState(null)

    const { 
        destination,
        setHoraFuncionamento,
        horaFuncionamento,
        setTipoReserva,
        priceTable
    } = useContext(ReservaContext)
    const { taxaHoraExtra, taxaCancelamento, tempo_tolerancia } = destination
    const { corPrimaria } = theme

    function agendar() {
        setTipoReserva("schedule")
        
        setModalDatePicker(true)
    }

    function irAgora() {
        setTipoReserva("now")

        setInformacoes(false)
        setEscolherVeiculo(true)
    }

    async function retornarHorarioDeFuncionamento() {
        await api.get(`/hora_funcionamento/${destination.id}`) 
            .then(res => {
                setHoraFuncionamento(res.data)
            })
            .catch(e => {
                console.log("Erro ao carregar horário de funcionamento: " + e)
            })
    }
    
    function tempoTolerancia(tempo) {
        if (tempo) return tempo + " minutos"
    }

    function horarioDeFuncionamento(hora) {

        if (!hora) {
            return null
        }

        const diaDaSemana = {
            mon: "Segunda-feira",
            tue: "Terça-feira",
            wed: "Quarta-feira",
            thu: "Quinta-feira",
            fri: "Sexta-feira",
            sat: "Sábado",
            sun: "Domingo"
        }
        
        const mapDayWeek = diaDaSemana[new Date().toString().split(" ")[0].toLowerCase()]
        const findOpeningHour = hora?.find(
            item => item.dia_semana === mapDayWeek
        )

        let horaAbertura = findOpeningHour?.hora_abertura ?? ""
        let horaFechamento = findOpeningHour?.hora_fechamento ?? ""
        
        if (horaAbertura == horaFechamento) {
            return "24 horas"
        }

        return horaAbertura.slice(0, 5) + " - " + horaFechamento.slice(0, 5)
    }

    useEffect(() => {
        setLoading(true)
        retornarHorarioDeFuncionamento()
    }, [])

    useEffect(() => {
        if (priceTable.length > 0 || STATUS_APP === "test") {
            setLoading(false)
        }
    }, [priceTable])

    return (
        <ScrollView contentContainerStyle={styles.dashContent} >
            {/* <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
                <TouchableOpacity style={styles.botaoLigar} activeOpacity={0.7}>
                    <Ionicons name="call" size={14} color="#0097b9" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#0097b9" }}>Ligar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoLigar} activeOpacity={0.7}>
                    <FontAwesome5 name="directions" size={14} color="#0097b9" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#0097b9" }}>Rota</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCompartilhar} activeOpacity={0.7}>
                    <Ionicons name="share-social" size={14} color="#f4f4f4" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#f4f4f4" }}>Compartilhar</Text>
                </TouchableOpacity>
            </View> */}

            <View style={styles.informacoes}>
                <Text style={styles.textoInformacoes}>Informações</Text>
                <View style={{ gap: 10 }}>
                    <View style={styles.viewContent}>
                        <Feather name="clock" size={18} color="#7d7d7d" />
                        <Text style={styles.textContent}>
                            Horário de funcionamento: {horaFuncionamento && horarioDeFuncionamento(horaFuncionamento)}
                        </Text>
                    </View>
                    <View style={styles.viewContent}>
                        <MaterialCommunityIcons name="tag-outline" size={18} color="#7d7d7d" />
                        <Text style={styles.textContent}>
                            Taxa hora extra:
                            {taxaHoraExtra}
                        </Text>
                    </View>
                    <View style={styles.viewContent}>
                        <MaterialCommunityIcons name="tag-outline" size={18} color="#7d7d7d" />
                        <Text style={styles.textContent}>
                            Taxa cancelamento:
                            {taxaCancelamento}
                        </Text>
                    </View>
                    <View style={styles.viewContent}>
                        <Feather name="clock" size={18} color="#7d7d7d" />
                        <Text style={styles.textContent}>
                            Tempo de tolerância: {tempo_tolerancia && tempoTolerancia(tempo_tolerancia)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.horarios}>
                <View>
                    <Text style={styles.textoHorarios}>Horários</Text>
                </View>
                {priceTable ? 
                <FlatList
                    horizontal
                    data={priceTable}
                    renderItem={(item) => (
                        <ListaDePrecos 
                            {...item} 
                            botaoAtivo={botaoAtivo} 
                            setBotaoAtivo={setBotaoAtivo} 
                        />
                    )}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                /> : 
                "Nenhum horário disponível"
                }
            </View>

            <MaisTempo>
                <BotaoClicar activeOpacity={0.7} onPress={() => setModalMaisTempo(true)}>
                    <TextLine>Ainda precisa de mais tempo?</TextLine> 
                    <TextBlue>Clica aqui.</TextBlue>
                </BotaoClicar>
            </MaisTempo>

            <View style={styles.botoesInferiores}>
                {/* 
                    "Ir agora": verificar se há vagas disponíveis nos próximos momentos e confirmar a entrada da 
                    reserva na data do dia. A hora de entrada vai ser marcado a partir do tempo estimado de chegada até 
                    o local + o tempo de tolerância. Se não tiver vagas disponíveis para o momento, mostrar um aviso indicando
                    o horário mais próximo que terá uma vaga livre para ser reservada. Se o cliente concordar, segue o fluxo,
                    se não concordar, fecha o modal
                */}
                <Botao
                    children={"Ir agora"}
                    estilo={(botaoAtivo ? styles.botaoIrAgora : styles.botaoIrAgoraInativo)}
                    aoPressionar={irAgora}
                    disabled={(botaoAtivo ? false : true)}
                    largura={"47%"}
                    negrito
                    corDoTexto={(botaoAtivo ? corPrimaria : "rgba(125, 125, 125, 0.5)")}
                />

                {/* 
                    "Agendar": verificar se há vagas disponíveis para a hora selecionada e confirmar a vaga. Se não tiver,
                    retornar um aviso indicando para escolher outro horário e sugerir um horário que esteja mais livre
                */}
                <Botao
                    children={"Agendar"}
                    estilo={styles.botaoAgendar}
                    corDeFundo={botaoAtivo ? corPrimaria : "#7d7d7d"}
                    corDoTexto={"#fff"}
                    largura={"47%"}
                    negrito
                    aoPressionar={agendar}
                    disabled={botaoAtivo ? false : true}
                />
            </View>

            <LoadingModal loading={loading} />
        </ScrollView>
    )
}

export default Menu