import { KeyboardAvoidingView, Platform, Text, TouchableOpacity } from "react-native"
import { styles } from "../styles"
import { theme } from "../../../Theme"
import { LinearGradient } from "expo-linear-gradient"
import { Feather } from "@expo/vector-icons"
import { useReservation } from "../../../Context/reservaContext"
import { useUser } from "../../../Context/dataUserContext"

const EstouIndoPara = () => {

    const { corPrimaria, corFonteSecundaria } = theme

    const { setModalPesquisar } = useUser()
    const { destination, reservaFeita } = useReservation()

    return <>
        {(!destination && !reservaFeita) &&
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
            >
                <LinearGradient
                    style={(styles.buscar)}
                    colors={['#f4f4f4', '#f4f4f4']}
                    locations={[0, 1]}
                >
                    <Text style={styles.estouIndoPara}>Estou indo para</Text>

                    <TouchableOpacity
                        style={{
                            backgroundColor: '#e9e9e9',
                            borderWidth: 1,
                            borderColor: corPrimaria,
                            borderRadius: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 16,
                            paddingVertical: 12
                        }}
                        onPress={() => setModalPesquisar(true)}
                    >
                        <Text style={{ color: corFonteSecundaria }}>Selecione seu destino</Text>
                        <Feather name='search' size={19} color='#7d7d7d' />
                    </TouchableOpacity>
                </LinearGradient>
            </KeyboardAvoidingView>
        }
    </>
}

export default EstouIndoPara