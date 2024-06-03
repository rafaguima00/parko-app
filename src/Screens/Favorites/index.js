import React from "react"
import { Feather, FontAwesome } from "react-native-vector-icons"
import {
    View,
    TouchableOpacity,
    Text,
    FlatList,
    Image,
    Alert
} from "react-native"
import { styles } from "./style"

export default function Favorites({ navigation }) {

    const renderItem = ({ item }) => {
        return (
            <View style={styles.dados}>
                <View style={styles.itens}>
                    <Image source={item.imagem} />
                    <Text style={styles.nome}>{item.nome}</Text>
                </View>
                <TouchableOpacity onPress={() => {
                    Alert.alert(
                        "Remover da lista",
                        `Deseja remover o estacionamento ${item.nome} dos seus favoritos?`,
                        [
                            {
                                text: 'OK',
                                onPress: () => { console.log("Botão 'OK' pressionado") },
                                style: styles.botaoOk
                            },
                            {
                                text: 'Cancelar',
                                onPress: () => { console.log("Botão 'Cancelar' pressionado") }
                            }
                        ]
                    )
                }}>
                    <FontAwesome name="trash-o" size={26} color="#545454" />
                </TouchableOpacity>
            </View>
        )
    }

    const EmptyListMessage = () => {
        return (
            <Text style={styles.mensagemVazio}>Lista de favoritos vazia</Text>
        )
    }

    return <View style={styles.areaContent}>
        <View style={styles.cabecalho}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Feather name="arrow-left" size={32} />
            </TouchableOpacity>
            <Text style={styles.topoFavoritos}>Favoritos</Text>
        </View>
        <FlatList
            data={{}}
            renderItem={renderItem}
            keyExtractor={item => item.nome}
            ListEmptyComponent={EmptyListMessage}
        />
    </View>
}