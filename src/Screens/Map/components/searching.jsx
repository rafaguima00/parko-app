import { FlatList, Image, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-paper"
import { styles, TextFavorites } from "../styles"
import { theme } from "../../../Theme"
import { Feather } from "@expo/vector-icons"
import { useState } from "react"
import { useUser } from "../../../Context/dataUserContext"
import useParkings from "../../../Hooks/useParkings"
import useDistance from "../hooks/useDestination"
import Suggestions from "./suggestions"
import LoadingModal from "../../../Components/Loading"

const Searching = () => {

    const { corPrimaria, corFonteSecundaria } = theme

    const { favorites, setModalPesquisar } = useUser()

    const { autocompletePlaces } = useParkings()
    const { retornarCoordenadas } = useDistance()
    
    const [address, setAddress] = useState("")
    const [suggestions, setSuggestions] = useState([])
    const [loading, setLoading] = useState(false)

    const handleChange = async (text) => {
        setAddress(text)
        await autocompletePlaces(address, setSuggestions)
    }

    return (
        <>
            {loading && <LoadingModal loading={loading} />}
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
                    value={address}
                    onChangeText={text => handleChange(text)}
                    right={
                        <TextInput.Icon
                            icon={'close'}
                            onPress={() => setAddress("")}
                        />
                    }
                />
                {
                    address === "" &&
                    <View>
                        <TextFavorites>Favoritos</TextFavorites>
                        <FlatList 
                            data={favorites}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => (
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
                                        retornarCoordenadas({ item }, setLoading)
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
                            )}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                }
                {suggestions?.length > 0 && 
                    <Suggestions suggestions={suggestions} />
                }
            </View>
        </>
    )
}

export default Searching