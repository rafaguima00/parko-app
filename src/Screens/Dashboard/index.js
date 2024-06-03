import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    Modal,
    View,
    FlatList,
    Text,
    TouchableOpacity,
    TextInput,
    Image,
    Alert
} from 'react-native';
import { Ionicons } from 'react-native-vector-icons'
import Topo from "./components/Top";
import { theme } from "../../Theme";
import { styles } from "./style";
import ModalConfirmacao from "./components/Modal/confirmacao";
import ModalMsgConfirmacao from "./components/Modal/mensagemConfirmacao";
import DatePickerModal from "./components/Modal/datePicker";
import { Botao } from "../../Components/Botao";
import { estacionamentos } from "../../Mocks/estacionamentos";
import { ReservaContext } from "../../Context/reservaContext";
import infoEstacionamento from "../../Mocks/infoEstacionamento";
import Menu from "./components/Menu";
import dadosCarro from "../../Mocks/dadosVeiculo";

function Dashboard({ navigation }) {
    
    const { corPrimaria } = theme;

    const [informacoes, setInformacoes] = useState(true)
    const [escolherVeiculo, setEscolherVeiculo] = useState(false)
    const [cadastrarVeiculo, setCadastrarVeiculo] = useState(false)
    const [pagamento, setPagamento] = useState(false)
    const [addCartao, setAddCartao] = useState(false)
    const [selecionarPgto, setSelecionarPgto] = useState(false)
    const [modalConfirma, setModalConfirma] = useState(false)
    const [modalMsgConfirma, setModalMsgConfirma] = useState(false)
    const [modalDatePicker, setModalDatePicker] = useState(false)

    const [imageLoaded, setImageLoaded] = useState(false);
    const [botaoCarroAtivo, setBotaoCarroAtivo] = useState(false)

    const [nomeVeiculo, setNomeVeiculo] = useState('')
    const [placaVeiculo, setPlacaVeiculo] = useState('')
    const [corVeiculo, setCorVeiculo] = useState('')
    const [cartaoDeCredito, setCartaoDeCredito] = useState([])

    const [erro, setErro] = useState(false)
    const [mensagemErro, setMensagemErro] = useState('')

    const placeholder = [
        {
            placeholder: 'Nome do veículo',
            value: nomeVeiculo,
            onChange: setNomeVeiculo
        },
        {
            placeholder: 'Placa do veículo',
            value: placaVeiculo,
            onChange: setPlacaVeiculo
        },
        {
            placeholder: 'Cor do veículo',
            value: corVeiculo,
            onChange: setCorVeiculo
        },
    ]

    const [veiculosCadastrados, setVeiculosCadastrados] = useState([])

    const { setVeiculoEscolhido } = useContext(ReservaContext)

    const cliqueBotao = (item) => {
        setBotaoCarroAtivo(item.placa);
    };

    const renderItem = ({ item }) => {
        const botaoClicado = botaoCarroAtivo === item.placa;

        return (
            <TouchableOpacity
                style={(
                    botaoClicado ? styles.botaoAtivo : styles.botaoDesativado
                )}
                onPress={() => {
                    cliqueBotao(item)
                    setVeiculoEscolhido({
                        nome: item.nome,
                        placa: item.placa,
                        cor: item.cor
                    })
                }}
                activeOpacity={1}
            >
                <TouchableOpacity
                    style={{
                        position: 'absolute',
                        right: -5,
                        top: -5,
                        backgroundColor: 'rgba(125, 125, 125, 0.6)',
                        paddingVertical: 5,
                        paddingHorizontal: 8,
                        borderRadius: 25
                    }}
                    onPress={() => {
                        Alert.alert(
                            "Excluir veículo",
                            "Tem certeza de que deseja excluir o veículo?",
                            [
                                {
                                    text: 'OK',
                                    onPress: () => deletarVeiculos(item.id)
                                },
                                {
                                    text: 'Cancelar'
                                }
                            ]
                        )
                    }}
                >
                    <Text>X</Text>
                </TouchableOpacity>
                <View style={styles.viewCarro}>
                    <Ionicons name="car" size={28} color={(botaoClicado ? '#fff' : '#545454')} />
                    <Text style={(
                        botaoClicado ? styles.nomeCarroAtivo : styles.nomeCarroDesativado
                    )}>{item.nome}</Text>
                </View>
                <Text style={(
                    botaoClicado ? styles.placaCarroAtivo : styles.placaCarroDesativado
                )}>{item.placa}</Text>
                <Text style={(
                    botaoClicado ? styles.corCarroAtivo : styles.corCarroDesativado
                )}>{item.cor}</Text>
            </TouchableOpacity>
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.veiculosVazio}>
                Nenhum cartão cadastrado no momento. Clique no "+" para adicionar seu cartão
            </Text>
        )
    }

    async function adicionarVeiculo() {
        if (nomeVeiculo === "" || placaVeiculo === "" || corVeiculo === "") {
            setErro(true)
            setMensagemErro('Preencha todos os campos')
        } else if (placaVeiculo.length < 7) {
            setErro(true)
            setMensagemErro('Placa de veículo inválida')
        } else {
            setErro(false)
            setCadastrarVeiculo(false)
            setEscolherVeiculo(true)
            setNomeVeiculo('')
            setPlacaVeiculo('')
            setCorVeiculo('')
            console.log("Veiculo adicionado")
        }
    }

    async function deletarVeiculos(veiculoId) {
        console.log(`Veículo ${veiculoId} removido`)
    }

    const [selectedDate, setSelectedDate] = useState('')

    return (
        <SafeAreaView style={styles.content}>

            <Topo
                handleImageLoaded={() => setImageLoaded(true)}
                voltar={() => navigation.navigate('Mapa')}
            />

            {(imageLoaded && informacoes) &&
                <Menu 
                    setModalDatePicker={setModalDatePicker}
                    closeModalPrincipal={() => {
                        setInformacoes(false)
                        setEscolherVeiculo(true)
                    }}
                />
            }

            {escolherVeiculo &&
                <View style={[styles.dashContent, styles.escolher]}>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.tituloPrincipal} >Qual seu veículo?</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.txtSelecioneVeiculo} >Selecione seu veículo</Text>
                        <TouchableOpacity>
                            <Text
                                style={styles.botaoMais}
                                onPress={() => {
                                    setEscolherVeiculo(false)
                                    setCadastrarVeiculo(true)
                                }}
                            >
                                +
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        contentContainerStyle={styles.itens}
                        numColumns={2}
                        ListEmptyComponent={EmptyListMessage}
                        data={dadosCarro}
                        renderItem={renderItem}
                        keyExtractor={item => item.placa}
                    />
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Botao
                            children={"Confirmar"}
                            corDeFundo={(botaoCarroAtivo ? corPrimaria : "rgba(125, 125, 125, 0.4)")}
                            largura={'100%'}
                            corDoTexto={'#fff'}
                            negrito
                            disabled={(botaoCarroAtivo ? false : true)}
                            aoPressionar={() => {
                                setEscolherVeiculo(false)
                                setPagamento(true)
                            }}
                        />
                    </View>
                </View>
            }

            {cadastrarVeiculo &&
                <View style={[styles.dashContent, styles.escolher]} >
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.tituloPrincipal}>Cadastrar Veículo</Text>
                    </View>
                    <View style={styles.formCard}>
                        {placeholder.map((item, index) => (
                            <TextInput
                                key={index}
                                placeholder={item.placeholder}
                                style={styles.input}
                                value={item.value}
                                onChangeText={item.onChange}
                                autoCapitalize={item.placeholder == "Placa do veículo" ? 'characters' : 'words'}
                                maxLength={item.placeholder == "Placa do veículo" ? 7 : undefined}
                            />
                        ))}

                        <View>
                            {erro &&
                                <Text style={{ color: 'red' }}>{mensagemErro}</Text>
                            }
                        </View>
                    </View>
                    <View style={{
                        position: 'absolute',
                        bottom: 20,
                        width: '100%',
                        marginHorizontal: 26
                    }} >
                        <Botao
                            children={"Confirmar"}
                            corDeFundo={corPrimaria}
                            largura={'100%'}
                            corDoTexto={'#fff'}
                            negrito
                            aoPressionar={adicionarVeiculo}
                        />
                    </View>
                </View>
            }

            {pagamento &&
                <View style={[styles.dashContent, styles.escolher]} >
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.tituloPrincipal} >Pagamento</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.txtSelecioneCartao} >Selecione seu cartão de crédito</Text>
                        <TouchableOpacity>
                            <Text style={styles.botaoMais} onPress={() => {
                                setPagamento(false)
                                setAddCartao(true)
                            }}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        style={{ marginTop: 10, marginBottom: 46, paddingTop: 10 }}
                        horizontal
                        data={cartaoDeCredito}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        ListEmptyComponent={EmptyListMessage}
                    />
                    <View style={{ justifyContent: 'center' }} >
                        <TouchableOpacity onPress={() => {
                            setPagamento(false)
                            setSelecionarPgto(true)
                        }} >
                            <Text style={styles.escolherFormaPgto}>Escolher outra forma de pagamento</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.itemTotal}>
                        <Text style={styles.total}>TOTAL</Text>
                        <Text style={styles.total}>
                            {infoEstacionamento.horarios[0].preco}
                        </Text>
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                        <Botao
                            children={"Confirmar"}
                            corDeFundo={corPrimaria}
                            largura={'100%'}
                            corDoTexto={'#fff'}
                            negrito
                            aoPressionar={() => {
                                setPagamento(false)
                                setModalConfirma(true)
                            }}
                        />
                    </View>
                </View>
            }

            {addCartao &&
                <View style={[styles.dashContent, styles.escolher, { alignItems: 'center' }]}>
                    <View>
                        <Text style={styles.tituloPrincipal}>Adicionar Cartão</Text>
                    </View>
                    <View>
                        <Image
                            source={require('../../../assets/image-card.png')}
                            style={styles.imagemCartao}
                        />
                    </View>
                    <View style={styles.formAddCard}>
                        <TextInput
                            autoCapitalize="words"
                            placeholder="Nome Completo"
                            placeholderTextColor={'#7d7d7d'}
                            style={styles.input}
                        />
                        <TextInput
                            placeholder="Número do cartão"
                            placeholderTextColor={'#7d7d7d'}
                            maxLength={16}
                            keyboardType='numeric'
                            style={styles.input}
                        />
                        <View style={styles.flexCvc}>
                            <TextInput
                                placeholder="Data de validade"
                                keyboardType='numeric'
                                placeholderTextColor={'#7d7d7d'}
                                style={styles.inputInferior}
                            />
                            <TextInput
                                placeholder="CVC"
                                placeholderTextColor={'#7d7d7d'}
                                style={styles.inputInferior}
                                maxLength={3}
                            />
                        </View>
                    </View>
                    <Botao
                        children={"Confirmar"}
                        corDeFundo={corPrimaria}
                        largura={'100%'}
                        corDoTexto={'#fff'}
                        negrito
                        aoPressionar={() => {
                            setAddCartao(false)
                            setPagamento(true)
                        }}
                    />
                </View>
            }

            {selecionarPgto &&
                <View style={[styles.dashContent, styles.escolher]}>
                    <View style={{ alignItems: 'center' }} >
                        <Text style={styles.tituloPrincipal}>Pagamento</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.txtSelecioneCartao} >Cartão de crédito</Text>
                        <TouchableOpacity onPress={() => {
                            setSelecionarPgto(false)
                            setAddCartao(true)
                        }}>
                            <Text style={styles.botaoMais}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.txtSelecioneCartao} >Cartão de débito</Text>
                        <TouchableOpacity>
                            <Text style={styles.botaoMais}>+</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                        <Text style={styles.txtSelecioneCartao} >Pix</Text>
                        <TouchableOpacity>
                            <Text style={styles.botaoMais}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            <Modal
                visible={modalConfirma}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <ModalConfirmacao
                    handleClose={() => {
                        setModalConfirma(false)
                        setInformacoes(true)
                    }}
                    mensagemConfirmacao={() => {
                        setModalConfirma(false)
                        setModalMsgConfirma(true)
                    }}
                />
            </Modal>

            <Modal
                visible={modalMsgConfirma}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <ModalMsgConfirmacao
                    modalAtivo={modalMsgConfirma}
                    handleClose={() => {
                        setModalMsgConfirma(false)
                    }}
                />
            </Modal>

            <Modal
                visible={modalDatePicker}
                transparent={true}
                onRequestClose={() => { }}
                animationType="fade"
            >
                <DatePickerModal
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                    setModalConfirma={() => {
                        setModalDatePicker(false)
                        setModalConfirma(true)
                    }}
                />
            </Modal>
        </SafeAreaView>
    )
}

export default Dashboard;