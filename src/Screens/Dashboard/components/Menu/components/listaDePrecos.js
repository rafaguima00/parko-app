import { Text, TouchableOpacity, View } from "react-native"
import { RenderHeader, styles } from "../style"
import { ReservaContext } from "../../../../../Context/reservaContext"
import { useContext } from "react"
import { formatCurrency } from "../../../../../Services/formatCurrency"
import { Octicons } from "react-native-vector-icons"

const ListaDePrecos = ({ item, botaoAtivo, setBotaoAtivo }) => {
    const botaoClicado = botaoAtivo === item.id

    const { personalizado, destination, setValorPreSelecionado, setItemPreSelecionado } = useContext(ReservaContext)

    function converterEscrita(hora) {

        if (hora?.startsWith("0")) {
            const abr = hora.substring(1, 2)

            if (abr > 1) {
                return abr + " horas"
            }

            return abr + " hora"
        }

        const abreviar = hora?.substring(0, hora.length)

        return abreviar + " horas"
    }

    function preSelect(item) {
        setBotaoAtivo(item.id)
        setValorPreSelecionado(item.value)

        if (item?.segunda_hora?.startsWith("0")) {
            const abr = item.segunda_hora.substring(1, 2)

            setItemPreSelecionado({
                hora_saida: (parseInt(abr) * 60) * 60 // Tempo de duração da reserva em segundos
            })
            return
        }

        const abreviar = item?.segunda_hora?.substring(0, 2)

        setItemPreSelecionado({
            hora_saida: (parseInt(abreviar) * 60) * 60 // Tempo de duração da reserva em segundos
        })
    }

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
        {item.id != "personalizado" && destination.type_of_charge === "tabela_fixa" ?
            <TouchableOpacity
                style={
                    botaoClicado ? styles.botaoHorariosAtivo : styles.botaoHorariosDesativado
                }
                onPress={() => {
                    preSelect(item)
                }}
                activeOpacity={0.9}
            >
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoAtivo : styles.textoBotaoDesativado
                    )}
                >
                    {converterEscrita(item?.segunda_hora ?? "")}
                </Text>
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoPrecoAtivo : styles.textoBotaoPrecoDesativado
                    )}>
                    {formatCurrency((item?.value ?? 0) * 0.95)}
                </Text>
            </TouchableOpacity> : item.id != "personalizado" && destination.type_of_charge === "hora_fracao" ?
            <TouchableOpacity
                style={
                    botaoClicado ? styles.botaoHorariosAtivo : styles.botaoHorariosDesativado
                }
                onPress={() => {
                    preSelect(item)
                }}
                activeOpacity={0.9}
            >
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoAtivo : styles.textoBotaoDesativado
                    )}
                >
                    1 hora
                </Text>
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoPrecoAtivo : styles.textoBotaoPrecoDesativado
                    )}>
                    {formatCurrency((item?.valor_hora ?? 0) * 0.95)}
                </Text>
            </TouchableOpacity> : ""
        }
    </>
}

export default ListaDePrecos