import React, { useEffect, useState } from "react"
import { 
    SafeAreaView, 
    StatusBar, 
    Text, 
    StyleSheet, 
    Platform,
    TouchableOpacity,
    View,
    FlatList
} from "react-native"
import { 
    ButtonPlus,
    Cabecalho, 
    Faq, 
    ItemList, 
    ListView, 
    Plus, 
    Separator, 
    TextAjuda, 
    TextInputArea, 
    TextSubject, 
    ViewHeader 
} from "./style"
import { Feather } from "react-native-vector-icons"
import { TextInput } from "react-native-paper"
import { theme } from "../../Theme"
import api from "../../Services/api"
import { useUser } from "../../Context/dataUserContext"
import LoadingModal from "../../Components/Loading"

const Ajuda = ({ navigation }) => {

    const { corFonteSecundaria, corPrimaria } = theme
    const { setFaq, faq } = useUser()

    const [textoDigitado, setTextoDigitado] = useState("")
    const [faqFiltrado, setFaqFiltrado] = useState([])
    const [faqId, setFaqId] = useState([])
    const [loading, setLoading] = useState(true)

    const filtrarItens = text => {
        setTextoDigitado(text)

        if (text === "") {
            setFaqFiltrado(faq)
        } else {
            const itensFiltrados = faq.filter(item =>
                item.pergunta.toLowerCase().includes(text.toLowerCase())
            )
            setFaqFiltrado(itensFiltrados)
        }
    }

    async function getData() {
        await api.get("/faq")
        .then(res => {
            setFaq(res.data)
        })
        .catch(() => {
            setFaq("erro ao carregar dados")
        })
        .finally(() => {
            setLoading(false)
        })
    }

    function showAnswer(id) {

        if (faqId.includes(id)) {
            setFaqId(faqId.filter(item => item !== id))
        } else {
            setFaqId([...faqId, id])
        }
    }

    const renderItem = ({ item }) => {
        return <>
            <View>
                <ItemList>
                    <TextSubject>{item.pergunta}</TextSubject>
                    <ButtonPlus
                        onPress={() => showAnswer(item.id)}
                        activeOpacity={0.7}
                    >
                        <Plus>
                            {faqId.includes(item.id) ? "-" : "+"}
                        </Plus>
                    </ButtonPlus>
                </ItemList>
                {faqId.includes(item.id) && (
                    <Text style={{ color: "#7d7d7d" }}>{item.resposta}</Text>
                )}
            </View>
        </>
    }

    const renderHeader = () => (
        <ViewHeader>
            <Faq>FAQ</Faq>
        </ViewHeader>
    )

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (faq.length > 0) {
            setFaqFiltrado(faq)
        }
    }, [faq])

    return <>
        <StatusBar 
            barStyle="dark-content" 
            backgroundColor="transparent" 
            translucent 
        />
        <SafeAreaView style={styles.container}>
            <Cabecalho>
                <TouchableOpacity 
                    onPress={() => {
                        navigation.goBack()
                    }}
                >
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <TextAjuda>Ajuda</TextAjuda>
            </Cabecalho>
            <TextInputArea>
                <TextInput
                    placeholder="Procurar ajuda"
                    placeholderTextColor={corFonteSecundaria}
                    mode="outlined"
                    outlineStyle={{ borderRadius: 50, borderColor: corPrimaria }}
                    value={textoDigitado}
                    onChangeText={text => filtrarItens(text)}
                    right={
                        <TextInput.Icon
                            icon={'close'}
                            onPress={() => filtrarItens("")}
                        />
                    }
                />
            </TextInputArea>
            <ListView>
                <FlatList 
                    data={faqFiltrado}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={renderHeader}
                />
            </ListView>
        </SafeAreaView>
        <LoadingModal loading={loading} />
    </>
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    }
})

export default Ajuda