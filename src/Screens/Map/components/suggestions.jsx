import { Text, TouchableOpacity, View } from "react-native"
import useParkings from "../../../Hooks/useParkings"
import { styles } from "../styles"
import { useRef, useState } from "react"

const Suggestions = (props) => {

    const { suggestions } = props

    const { geoCodingApi } = useParkings()

    const [loading, setLoading] = useState(false)

    const clickedRef = useRef()

    return <>
        {loading && <Text>Carregando...</Text>}
        <View style={{ marginTop: 10 }}>
            {suggestions?.map((item) => (
                <TouchableOpacity 
                    key={item.id} 
                    style={{
                        flexDirection: 'column',
                        alignItems: 'start',
                        marginBottom: 8,
                        borderBottomColor: '#7d7d7d',
                        borderBottomWidth: 1,
                        paddingBottom: 8
                    }}
                    onPress={() => geoCodingApi(item.mainText, clickedRef, setLoading)}
                >
                    <Text style={styles.nome}>
                        {item.mainText}
                    </Text>{", "}
                    <Text style={styles.address}>
                        {item.secondaryText}
                    </Text>
                </TouchableOpacity>
            ))}
        </View>
    </>
}

export default Suggestions