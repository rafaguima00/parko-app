import { useEffect, useState } from "react"
import { 
    SafeAreaView, 
    StatusBar, 
    FlatList
} from "react-native"
import { 
    Faq, 
    ListView, 
    Separator, 
    TextInputArea, 
    ViewHeader, 
    styles
} from "./style"
import { TextInput } from "react-native-paper"
import { theme } from "../../Theme"
import api from "../../Services/api"
import { useUser } from "../../Context/dataUserContext"
import LoadingModal from "../../Components/Loading"
import TopArrowLeft from "../../Components/TopArrowLeft"
import FaqList from "./components/faqList"

const Ajuda = () => {

    const { corFonteSecundaria, corPrimaria } = theme
    const { setFaq, faq } = useUser()

    const [textoDigitado, setTextoDigitado] = useState("")
    const [faqFiltrado, setFaqFiltrado] = useState([])
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
            <TopArrowLeft children={"Ajuda"} />
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
                    renderItem={item => <FaqList {...item} />}
                    showsVerticalScrollIndicator={false}
                    ItemSeparatorComponent={Separator}
                    ListHeaderComponent={renderHeader}
                />
            </ListView>
        </SafeAreaView>
        <LoadingModal loading={loading} />
    </>
}

export default Ajuda