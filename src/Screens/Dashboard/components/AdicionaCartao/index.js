import React from "react"
import { View } from "react-native"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior } from "../../style"
import { Feather } from "react-native-vector-icons"
import ViewCard from "../../../../Components/ViewCard"
import FormCard from "../../../../Components/FormCard"

const AdicionaCartao = (props) => {

    const { voltar } = props

    return <>
        <View style={[styles.dashContent, styles.escolher]}>
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Adicionar Cartão</TituloPrincipal>
            </TopModal>
            <ViewCard />
            <FormCard />
        </View>  
    </>
}

export default AdicionaCartao