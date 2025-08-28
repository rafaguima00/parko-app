import axios from "axios"
import { ACCESS_TOKEN } from "@env"
import { Alert } from "react-native"
import { usePayment } from "../../Context/paymentContext"

const DeleteCard = () => {

    const { setCard, card } = usePayment()

    async function deletarCartoes(email, idCard) {

        try {
            const searchResponse = await axios.get(
                `https://api.mercadopago.com/v1/customers/search?email=${email}`,
                {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                    }
                }
            )
        
            const costumer = searchResponse.data.results[0]
        
            if (costumer) {
                await axios.delete(
                    `https://api.mercadopago.com/v1/customers/${costumer.id}/cards/${idCard}`, 
                    {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                        }
                    }
                )
                    .then(() => {
                        const cardDeleted = card.filter(item => item.id != idCard)
                        setCard(cardDeleted)
                        Alert.alert("Cartão deletado.")
                    })
                    .catch(e => Alert.alert("Erro ao deletar cartão", e))
            }
        } catch (err) {
            console.log(err.response?.data || err.message)
        }
    }

    return { deletarCartoes }

}

export default DeleteCard