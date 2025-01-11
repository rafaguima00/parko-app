import React, { useState } from "react"
import { Feather } from "react-native-vector-icons"
import { 
    Text, 
    View, 
    Image, 
    TouchableOpacity, 
    FlatList, 
    Alert, 
    Modal, 
    ActivityIndicator 
} from "react-native"
import cartao from "../../../assets/image_money.png"
import { theme } from "../../Theme"
import { styles } from "./style"
import { Botao } from "../../Components/Botao"
import { emptyCard } from "../../Mocks/emptyList"

const { corPrimaria } = theme

export default function Payments({ navigation }) {

    const [cartaoAtivo, setCartaoAtivo] = useState(false)
    const [cartaoDeCredito, setCartaoDeCredito] = useState([])
    const [carregandoCartoes, setCarregandoCartoes] = useState(false)

    async function deletarCartoes(idCard) {
        console.log(`Cartão ${idCard} deletado`)
    }

    const renderItem = ({ item }) => {

        const botaoClicado = cartaoAtivo === item.numero

        return (
            <TouchableOpacity
                activeOpacity={1}
                style={(botaoClicado ? styles.viewCardAtivo : styles.viewCard)}
                onPress={() => setCartaoAtivo(item.numero)}
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
                            "Excluir cartão de crédito",
                            `Tem certeza de que deseja excluir este cartão?`,
                            [
                                {
                                    text: 'OK',
                                    onPress: () => deletarCartoes(item.id)
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
                <View style={{ gap: 12, justifyContent: 'flex-start' }}>
                    <Text style={styles.dadosCard}>{item.nome}</Text>
                    <Text style={styles.dadosCard}>{item.numero}</Text>
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                        <Text style={[styles.dadosCard, { fontSize: 15 }]}>{item.data_validade}</Text>
                        <Text style={[styles.dadosCard, { fontSize: 15 }]}>{item.cvc}</Text>
                    </View>
                </View>
                <Image source={{}} style={{ width: 54, height: 34 }} />
            </TouchableOpacity>
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.avisoCartao}>
                {emptyCard}
            </Text>
        )
    }

    return (
        <View style={styles.areaContent}>
            <View style={styles.cabecalho}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <Text style={styles.telaPagamento}>Pagamento</Text>
            </View>
            <View style={styles.circuloAzul}>
                <Image source={cartao} style={styles.imagemCard} />
            </View>
            <Text style={styles.selectVehicle}>Selecione seu cartão</Text>
            <FlatList
                style={{ marginTop: 10, marginBottom: 46, paddingTop: 10 }}
                horizontal
                data={cartaoDeCredito}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ListEmptyComponent={EmptyListMessage}
            />
            <Botao
                children={"Adicionar"}
                largura={'100%'}
                corDeFundo={corPrimaria}
                negrito
                corDoTexto={'#fff'}
                aoPressionar={() => navigation.navigate('Cadastrar Cartao')}
            />
            <Modal
                visible={carregandoCartoes}
                transparent={true}
                onRequestClose={() => {}}
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