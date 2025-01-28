import { styles } from "./style"
import { View, Text, Image } from "react-native"
import { usePayment } from "../../Context/paymentContext"

const ViewCard = () => {

    const { cardData } = usePayment()

    return <>
        <View style={{ alignItems: 'center', marginVertical: 42 }}>
            <View style={styles.viewCard}>
                <View style={{ gap: 12, justifyContent: 'flex-start' }}>
                    <Text style={styles.dadosCard}>{cardData.name}</Text>
                    <Text style={styles.dadosCard}>{cardData.card_number}</Text>
                    <View style={{ flexDirection: 'row', gap: 20, marginTop: 10 }}>
                        <Text style={[styles.dadosCard, { fontSize: 15 }]}>{cardData.date_time}</Text>
                        <Text style={[styles.dadosCard, { fontSize: 15 }]}>{cardData.cvc}</Text>
                    </View>
                </View>
                <Image source={{}} style={{ width: 54, height: 34 }} />
            </View>
        </View>
    </>
}

export default ViewCard