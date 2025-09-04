import { useNavigation } from "@react-navigation/native"
import { styles } from "../styles"
import { Feather, Ionicons } from "react-native-vector-icons"
import { TouchableOpacity, View } from "react-native"
import { useContext } from "react"
import { ReservaContext } from "../../../Context/reservaContext"

const BotoesSuperiores = () => {

    const navigation = useNavigation()
    const { destination, reservaFeita, setDestination } = useContext(ReservaContext)

    return <>
        <View style={styles.componentesMapa}>
            <View 
                style={[
                    styles.primeiraColuna, 
                    { left: (destination && !reservaFeita) ? 75 : 0 }
                ]}
            >
                <TouchableOpacity
                    style={styles.icone}
                    onPress={() => navigation.openDrawer()}
                >
                    <Feather name="menu" size={28} />
                </TouchableOpacity >

                <TouchableOpacity
                    style={styles.icone}
                    onPress={() => navigation.navigate('Veiculos')}
                >
                    <Ionicons name="car-outline" size={28} />
                </TouchableOpacity>
            </View>

            {(destination && !reservaFeita) &&
                <TouchableOpacity
                    style={[styles.icone, { position: "absolute", left: 0 }]}
                    onPress={() => {
                        setDestination(null)
                    }}
                >
                    <Feather name="arrow-left" size={28} />
                </TouchableOpacity>
            }
        </View>
    </>
}

export default BotoesSuperiores