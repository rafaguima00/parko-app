import { useContext, useState } from 'react';
import {
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    FlatList
} from 'react-native';
import {
    Ionicons,
    FontAwesome5,
    Feather,
    MaterialCommunityIcons
} from 'react-native-vector-icons'
import { Botao } from '../../../../Components/Botao';
import { styles } from './style';
import { theme } from '../../../../Theme';
import { ReservaContext } from '../../../../Context/reservaContext';
import infoEstacionamento from '../../../../Mocks/infoEstacionamento';

const Menu = ({ setModalDatePicker, closeModalPrincipal }) => {

    const [botaoAtivo, setBotaoAtivo] = useState(false)

    const { destination } = useContext(ReservaContext)
    const { horarioDeFuncionamento, taxaHoraExtra, taxaCancelamento, tempoTolerancia } = destination
    const { corPrimaria } = theme;

    const renderItem = ({ item }) => {
        const botaoClicado = botaoAtivo === item.preco;

        return (
            <TouchableOpacity
                style={(
                    botaoClicado ? styles.botaoHorariosAtivo : styles.botaoHorariosDesativado
                )}
                onPress={() => {
                    setBotaoAtivo(item.preco)
                }}
                activeOpacity={0.9}>
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoAtivo : styles.textoBotaoDesativado
                    )}>
                    {item.tempoPermanencia}
                </Text>
                <Text
                    style={(
                        botaoClicado ? styles.textoBotaoPrecoAtivo : styles.textoBotaoPrecoDesativado
                    )}>
                    {item.preco}
                </Text>
            </TouchableOpacity>
        )
    }

    return (
        <ScrollView contentContainerStyle={styles.dashContent} >
            <View style={{ flexDirection: "row", gap: 12, justifyContent: "center" }}>
                <TouchableOpacity style={styles.botaoLigar}>
                    <Ionicons name="call" size={14} color="#0097b9" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#0097b9" }}>Ligar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoLigar}>
                    <FontAwesome5 name="directions" size={14} color="#0097b9" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#0097b9" }}>Rota</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botaoCompartilhar}>
                    <Ionicons name="share-social" size={14} color="#f4f4f4" />
                    <Text style={{ fontFamily: "Roboto_400Regular", color: "#f4f4f4" }}>Compartilhar</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.informacoes}>
                <Text style={styles.textoInformacoes}>Informações</Text>
                <View style={{ gap: 10 }}>
                    <View style={styles.viewContent}>
                        <Feather name="clock" size={18} color="#7d7d7d" />
                        <Text style={styles.textContent}>
                            Horário de funcionamento:
                            {horarioDeFuncionamento}
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
                            Tempo de tolerância:
                            {tempoTolerancia}
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
                    data={infoEstacionamento.horarios}
                    renderItem={renderItem}
                    keyExtractor={item => { item.preco }}
                />
            </View>

            <View style={styles.botoesInferiores}>
                <Botao
                    children={"Ir agora"}
                    estilo={(botaoAtivo ? styles.botaoIrAgora : styles.botaoIrAgoraInativo)}
                    aoPressionar={closeModalPrincipal}
                    disabled={(botaoAtivo ? false : true)}
                    largura={'45%'}
                    negrito
                    corDoTexto={(botaoAtivo ? corPrimaria : "rgba(125, 125, 125, 0.5)")}
                />
                <Botao
                    children={"Agendar"}
                    estilo={styles.botaoAgendar}
                    corDeFundo={corPrimaria}
                    corDoTexto={'#fff'}
                    largura={'45%'}
                    negrito
                    aoPressionar={() => setModalDatePicker(true)}
                />
            </View>
        </ScrollView>
    )
}

export default Menu;