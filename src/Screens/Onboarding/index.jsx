import { Image, Text, View } from "react-native"
import { AreaView } from "./style"
import { useEffect, useState } from "react"
import frame1 from "../../../assets/frame_1.png"
import frame2 from "../../../assets/frame_2.png"
import frame3 from "../../../assets/frame_3.png"
import { useNavigation } from "@react-navigation/native"
import { theme } from "../../Theme"
import Message from "./components/Message"
import SelectedItem from "./components/SelectedItem"
import Frame from "./components/Frame"
import Button from "./components/Button"

const Onboarding = () => {

    const navigation = useNavigation()

    const { corRoxa } = theme

    const [text, setText] = useState("")
    const [index, setIndex] = useState(0)

    const [firstWord, ...rest] = text.split(" ")

    const messages = [
        {
            id: 1,
            text: "Encontre um estacionamento próximo",
            image: frame1
        },
        {
            id: 2,
            text: "Reserve sua vaga e garanta maior segurança",
            image: frame2
        },
        {
            id: 3,
            text: "Aproveite seu tempo sem se preocupar",
            image: frame3
        }
    ]

    const increment = () => {

        if (index === messages.length - 1) {
            navigation.replace("Login")

            return
        }

        setIndex(i => i + 1)
    }

    useEffect(() => {
        setText(messages[index].text)
    }, [index])

    return <>
        <AreaView>
            <Message firstWord={firstWord} rest={rest} />
            <SelectedItem index={index} /> 
            <Frame messages={messages} index={index} />
            <Button increment={increment} />
        </AreaView>
    </>
}

export default Onboarding