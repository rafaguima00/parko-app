import { useNavigation } from "@react-navigation/native"
import { TouchableOpacity } from "react-native"
import { Feather } from "react-native-vector-icons"
import { Cabecalho, TextPage } from "./style"

const TopArrowLeft = ({ children }) => {

    const navigation = useNavigation()

    return <>
        <Cabecalho>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={32} />
            </TouchableOpacity>
            <TextPage>{children}</TextPage>
        </Cabecalho>
    </>
}

export default TopArrowLeft