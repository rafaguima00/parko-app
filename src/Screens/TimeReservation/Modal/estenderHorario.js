import React, { useContext, useEffect, useState } from "react"
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet, 
    FlatList, 
    Modal, 
    Dimensions
} from 'react-native'
import { Botao } from "../../../Components/Botao"
import { theme } from "../../../Theme"
import { 
    BotaoFechar, 
    BotaoVoltar, 
    styles, 
    TopoBotao, 
    WarningText, 
    RenderHeader 
} from "../style"
import { ReservaContext } from "../../../Context/reservaContext"
import { formatCurrency } from "../../../Services/formatCurrency"
import { Feather, Octicons } from "react-native-vector-icons"
import { selecionarValor } from "../../../Mocks/warnings"
import ModalMaisTempo from "./ModalMaisTempo"
import LoadingModal from "../../../Components/Loading"

const { corPrimaria, fonteNegrito } = theme

export default function EstenderHorario(props) {

    const { width } = Dimensions.get('window')
    const { 
        setModalPagamento, 
        setModalEstendeHora,
        idDestination
    } = props

    const { 
        tabelaFixa,
        setItemPreSelecionado,
        personalizado,
        setValorPreSelecionado
    } = useContext(ReservaContext)

    const [botaoAtivo, setBotaoAtivo] = useState(null)
    const [error, setError] = useState(false)
    const [modalMaisTempo, setModalMaisTempo] = useState(false)
    const [loading, setLoading] = useState(false)

    const ITEM_SPACING = 20 
    const NUM_COLUMNS = 2 

    const ITEM_WIDTH = (width - ITEM_SPACING * (NUM_COLUMNS + 1)) / NUM_COLUMNS

    function avancar() {
        if(!botaoAtivo) {
            setError(true)
            return
        }

        setError(false)
        setModalEstendeHora(false)
        setModalPagamento(true)
    }

    function converterEscrita(hora) {

        if(hora.startsWith("0")) {
            const abr = hora.substring(1, 2)

            if(abr > 1) {
                return abr + " horas"
            }

            return abr + " hora"
        }

        const abreviar = hora.substring(0, 2)

        return abreviar + " horas"
    }

    function preSelect(item) {
        setBotaoAtivo(item.id)
        setValorPreSelecionado(item.value)

        if(item.segunda_hora.startsWith("0")) {
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
            {item.id != "personalizado" && 
                <TouchableOpacity 
                    style={[
                        botaoClicado ? estilos.botaoHorariosAtivo : estilos.botaoHorariosDesativado,
                        { width: ITEM_WIDTH }
                    ]} 
                    onPress={() => preSelect(item)} 
                    activeOpacity={0.9}
                >
                    <Text 
                        style={(
                            botaoClicado ? estilos.textoBotaoAtivo : estilos.textoBotaoDesativado
                        )}>
                            {converterEscrita(item?.segunda_hora ?? "")}
                    </Text>
                    <Text 
                        style={(
                            botaoClicado ? estilos.textoBotaoPrecoAtivo : estilos.textoBotaoPrecoDesativado
                        )}>
                            {formatCurrency((item?.value ?? 0) * 0.95)}
                        </Text>
                </TouchableOpacity>
            }

            {(personalizado === true && item.id == "personalizado") && 
                <RenderHeader
                    style={[
                        botaoClicado ? estilos.botaoHorariosAtivo : estilos.botaoHorariosDesativado,
                        { width: ITEM_WIDTH }
                    ]}
                    onPress={() => preSelect(item)}
                    activeOpacity={0.9}
                >
                    <View>
                        <Text 
                            style={(
                                botaoClicado ? estilos.textoBotaoAtivo : estilos.textoBotaoDesativado
                            )}
                        >
                            Personalizado • {converterEscrita(item?.segunda_hora ?? "")}
                        </Text>
                        <Text 
                            style={(
                                botaoClicado ? estilos.textoBotaoPrecoAtivo : estilos.textoBotaoPrecoDesativado
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
        </>
    }

    useEffect(() => {
        if(tabelaFixa.length > 0) {
            setLoading(false)
        }
    }, [tabelaFixa])

    return (
        <View style={styles.modalContainer}>
            <View style={[
                styles.dashContent, 
                { 
                    alignItems: 'center', 
                    borderTopRightRadius: 20, 
                    borderTopLeftRadius: 20,
                    flexWrap: "wrap"
                }
            ]}>
                <TopoBotao espacamento={32}>
                    <BotaoVoltar activeOpacity={0.7} onPress={() => setModalEstendeHora(false)}>
                        <Feather name="arrow-left" size={32} color="#444" />
                    </BotaoVoltar>
                    <BotaoFechar activeOpacity={0.7} onPress={() => setModalEstendeHora(false)}>
                        <Feather name="x" size={32} color="#444" />
                    </BotaoFechar>
                </TopoBotao>
                <View style={{justifyContent: 'center', alignItems: 'center'}} >
                    <Text style={estilos.tituloPrincipal}>Quer estender o horário da sua reserva?</Text>
                </View>
                <FlatList 
                    contentContainerStyle={[estilos.itens, { paddingHorizontal: ITEM_SPACING / 2 }]}
                    numColumns={2}
                    data={tabelaFixa}
                    renderItem={renderItem}
                    keyExtractor={item => item.id.toString()}
                    style={{ flexGrow: 0 }}
                    horizontal={false}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                />
                <WarningText>{error && selecionarValor}</WarningText>
                <View style={{flexDirection: 'row', marginBottom: 28}}>
                    <Text style={{color: '#545454', lineHeight: 36, fontSize: 15}}>Ainda precisa de mais tempo?</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setModalMaisTempo(true)}>
                        <Text style={{color: '#0097b9', textDecorationLine: 'underline', lineHeight: 36, fontSize: 15}}> Clica aqui</Text>
                    </TouchableOpacity>
                </View>
                <View style={{width: '85%', alignItems: 'center'}}>
                    <Botao 
                        children={"Estender"}
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        negrito
                        corDoTexto={'#fff'}
                        aoPressionar={avancar}
                    />
                </View>
            </View>

            <Modal
                visible={modalMaisTempo}
                animationType="fade"
                onRequestClose={() => {}}
                transparent={true}
            >
                <ModalMaisTempo 
                    idDestination={idDestination} 
                    setModalMaisTempo={setModalMaisTempo}
                />
            </Modal>

            <LoadingModal loading={loading} />
        </View>
    )
}

const estilos = StyleSheet.create({
    tituloPrincipal: {
        lineHeight: 35, 
        fontSize: 24, 
        fontFamily: "Roboto_700Bold",
        color: '#444', 
        paddingVertical: 16,
        paddingHorizontal: 36,
        textAlign: 'center'
    },
    textoHorarios: {
        color: "#353535", 
        fontFamily: fonteNegrito, 
        fontSize: 22
    },
    botaoHorariosAtivo: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        paddingVertical: 24,
        paddingLeft: 24,
        paddingRight: 42,
        backgroundColor: '#509c76'
    },
    botaoHorariosDesativado: {
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: corPrimaria,
        borderRadius: 12,
        paddingVertical: 24,
        paddingLeft: 24,
        paddingRight: 42,
        backgroundColor: 'transparent'
    },
    textoBotaoDesativado: {
        fontFamily: fonteNegrito,
        fontSize: 16,
        lineHeight: 24
    },
    textoBotaoAtivo: {
        fontFamily: fonteNegrito,
        fontSize: 16,
        lineHeight: 24,
        color: '#f4f4f4'
    },
    textoBotaoPrecoDesativado: {
        color: "#545454"
    },
    textoBotaoPrecoAtivo: {
        color: '#adcfc3'
    },
    itens: {
        marginVertical: 2, 
        alignItems: 'center'
    }
})