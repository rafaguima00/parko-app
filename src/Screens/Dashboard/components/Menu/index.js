import { useContext, useEffect, useState } from 'react'
import { ScrollView, View, TouchableOpacity, Text, FlatList } from 'react-native'
import { Feather, MaterialCommunityIcons, Octicons } from 'react-native-vector-icons'
import { Botao } from '../../../../Components/Botao'
import { BotaoClicar, MaisTempo, RenderHeader, styles, TextBlue, TextLine } from './style'
import { theme } from '../../../../Theme'
import { ReservaContext } from '../../../../Context/reservaContext'
import { formatCurrency } from "../../../../Services/formatCurrency"
import api from '../../../../Services/api'
import LoadingModal from '../../../../Components/Loading'

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
        personalizado, 
        setTabelaFixa,
        tabelaFixa,
        setHoraFuncionamento,
        horaFuncionamento,
        setItemPreSelecionado,
        setTipoReserva,
        setValorPreSelecionado
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

    async function retornarTabelaFixaDePreco() {
        await api.get(`/tabela_fixa/${destination.id}`)
        .then(res => {
            setTabelaFixa(res.data)
        })
        .catch(e => {
            console.log("Erro ao carregar tabela de preços: " + e)
        })
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
    
    function converterEscrita(hora) {

        if (hora.startsWith("0")) {
            const abr = hora.substring(1, 2)

            if (abr > 1) {
                return abr + " horas"
            }

            return abr + " hora"
        }

        const abreviar = hora.substring(0, hora.length)

        return abreviar + " horas"
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

    function preSelect(item) {
        setBotaoAtivo(item.id)
        setValorPreSelecionado(item.value)

        if (item.segunda_hora.startsWith("0")) {
            const abr = item.segunda_hora.substring(1, 2)

            setItemPreSelecionado({
                hora_saida: (parseInt(abr) * 60) * 60 // Tempo de duração da reserva em segundos
            })
            return
        }

        const abreviar = item.segunda_hora.substring(0, 2)

        setItemPreSelecionado({
            hora_saida: (parseInt(abreviar) * 60) * 60 // Tempo de duração da reserva em segundos
        })
    }

    const renderItem = ({ item }) => {
        const botaoClicado = botaoAtivo === item.id

        return <>
            {(personalizado === true && item.id == "personalizado") && 
                <RenderHeader
                    style={
                        botaoClicado ? styles.botaoHorariosAtivo : styles.botaoHorariosDesativado
                    }
                    onPress={() => preSelect(item)}
                    activeOpacity={0.9}
                >
                    <View>
                        <Text 
                            style={(
                                botaoClicado ? styles.textoBotaoAtivo : styles.textoBotaoDesativado
                            )}
                        >
                            Personalizado • {converterEscrita(item?.segunda_hora ?? "")}
                        </Text>
                        <Text 
                            style={(
                                botaoClicado ? styles.textoBotaoPrecoAtivo : styles.textoBotaoPrecoDesativado
                            )}
                        >
                            {formatCurrency((item?.value ?? 0) * 0.95)}
                        </Text>
                    </View>
                    <View>
                        <Octicons name="pencil" size={20} color={botaoClicado ? "white" : ""} />
                    </View>
                </RenderHeader>
            }
            {item.id != "personalizado" && 
                <TouchableOpacity
                    style={
                        botaoClicado ? styles.botaoHorariosAtivo : styles.botaoHorariosDesativado
                    }
                    onPress={() => {
                        preSelect(item)
                    }}
                    activeOpacity={0.9}>
                    <Text
                        style={(
                            botaoClicado ? styles.textoBotaoAtivo : styles.textoBotaoDesativado
                        )}>
                        {converterEscrita(item?.segunda_hora ?? "")}
                    </Text>
                    <Text
                        style={(
                            botaoClicado ? styles.textoBotaoPrecoAtivo : styles.textoBotaoPrecoDesativado
                        )}>
                        {formatCurrency((item?.value ?? 0) * 0.95)}
                    </Text>
                </TouchableOpacity>
            }
        </>
    }

    useEffect(() => {
        setLoading(true)
        retornarTabelaFixaDePreco()
        retornarHorarioDeFuncionamento()
    }, [])

    useEffect(() => {
        if (tabelaFixa.length > 0) {
            setLoading(false)
        }
    }, [tabelaFixa])

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
                            Tempo de tolerância: {tempoTolerancia(tempo_tolerancia)}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.horarios}>
                <View>
                    <Text style={styles.textoHorarios}>Horários</Text>
                </View>
                <FlatList
                    horizontal
                    data={tabelaFixa}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }} // Garante espaçamento
                    style={{ flexGrow: 0 }} // Evita restrições de altura
                />
            </View>

            <MaisTempo>
                <BotaoClicar onPress={() => setModalMaisTempo(true)}>
                    <TextLine>Ainda precisa de mais tempo?</TextLine> 
                    <TextBlue>Clica aqui.</TextBlue>
                </BotaoClicar>
            </MaisTempo>

            <View style={styles.botoesInferiores}>
                {/* 
                    Botão "Ir agora": verificar se há vagas disponíveis nos próximos momentos e confirmar a entrada da 
                    reserva na data do dia e a hora de entrada vai ser marcado a partir do tempo estimado de chegada até 
                    o local + tempo de tolerância. Se não tiver vagas disponíveis para o momento, mostrar um aviso indicando
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
                    Botão "Agendar": verificar se tem vagas disponíveis para a hora selecionada e confirmar a vaga. Se não tiver,
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