import React, { useState } from "react"
import { View, Text } from "react-native"
import { ButtonPlus, ItemList, Plus, TextSubject } from "../style"

const FaqList = ({ item }) => {

    const [faqId, setFaqId] = useState([])

    function showAnswer(id) {

        if (faqId.includes(id)) {
            setFaqId(faqId.filter(item => item !== id))
        } else {
            setFaqId([...faqId, id])
        }
    }

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

export default FaqList