import { ButtonAdvance, ButtonView } from "../../style"
import vector from "../../../../../assets/bx_bx-arrow-back.png"
import { Image, TouchableOpacity } from "react-native"

const Button = ({ increment }) => {
    return <>
        <ButtonView>
            <TouchableOpacity 
                onPress={increment}
                activeOpacity={0.9}
            >
                <ButtonAdvance>
                    <Image source={vector} />
                </ButtonAdvance>
            </TouchableOpacity>
        </ButtonView>
    </>
}

export default Button