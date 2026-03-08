import React from "react"
import { Octicons } from "react-native-vector-icons"
import { TouchableOpacity } from "react-native-gesture-handler"

export default function IconeEditarPerfil() {
    return <TouchableOpacity onPress={() => {}}>
        <Octicons name="pencil" size={28} color="#545454"/>
    </TouchableOpacity>
}