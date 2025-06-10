import { 
    View, 
    TouchableOpacity, 
    Text, 
    Image 
} from "react-native"
import { TextInput } from "react-native-paper"
import { styles, TextFavorites } from "../styles"
import { theme } from "../../../Theme"
import { Feather } from "react-native-vector-icons"
import { useEffect } from "react"
import { useUser } from "../../../Context/dataUserContext"

const Searching = (props) => {

    const { 
        setModalPesquisar, 
        setTextoDigitado, 
        setItensFiltrados,
        itensFiltrados, 
        textoDigitado 
    } = props.state
    const { filtrarItens, retornarCoordenadas } = props
    const { corPrimaria, corFonteSecundaria } = theme

    const { favorites } = useUser()

    useEffect(() => {
        if(itensFiltrados.length == 0 && textoDigitado === "") {
            setItensFiltrados(Array.isArray(favorites) ? favorites : [])
        }
    }, [itensFiltrados, textoDigitado])

    return (
        <View 
            style={{
                flex: 1,
                backgroundColor: '#f4f4f4',
                padding: 50
            }}
        >
            <View 
                style={{
                    flexDirection: 'row',
                    gap: 10,
                    alignItems: 'center',
                    marginBottom: 16
                }}
            >
                <TouchableOpacity onPress={() => setModalPesquisar(false)}>
                    <Feather name="arrow-left" size={32} />
                </TouchableOpacity>
                <Text style={styles.estouIndoPara}>Estou indo para</Text>
            </View>
            <TextInput
                placeholder="Selecione seu destino"
                placeholderTextColor={corFonteSecundaria}
                mode="outlined"
                outlineStyle={{ borderRadius: 50, borderColor: corPrimaria }}
                value={textoDigitado}
                onChangeText={text => filtrarItens(text)}
                right={
                    <TextInput.Icon
                        icon={'close'}
                        onPress={() => setTextoDigitado("")}
                    />
                }
            />
            {
                textoDigitado === "" &&
                <TextFavorites>Favoritos</TextFavorites>
            }
            <View style={{ marginTop: 10 }}>
                {Array.isArray(itensFiltrados) && itensFiltrados.slice(0, 6).map((item) => (
                    <TouchableOpacity 
                        key={item.id} 
                        style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: 15,
                            marginBottom: 8,
                            borderBottomColor: '#7d7d7d',
                            borderBottomWidth: 1,
                            paddingBottom: 8
                        }}
                        onPress={() => {
                            setModalPesquisar(false)
                            retornarCoordenadas({ item })
                        }}
                    >
                        <Image
                            style={{ 
                                width: 45, 
                                height: 45, 
                                borderRadius: 25,
                                borderWidth: 2, 
                                borderColor: corPrimaria 
                            }}
                            source={{ uri: item.image }} 
                        />
                        <Text style={styles.nome}>
                            {item.name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    )
}

export default Searching