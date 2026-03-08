import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { styles, TituloPrincipal, TopModal, VoltarTelaAnterior } from "../../style"
import { Feather } from "react-native-vector-icons"

const EscolherPgto = (props) => {

    const { setSelecionarPgto, setAddCartao } = props.states
    const { voltar } = props

    return <>
        <View style={[styles.dashContent, styles.escolher]}>
            <TopModal>
                <VoltarTelaAnterior onPress={voltar}>
                    <Feather name="arrow-left" size={32} color="#444" />
                </VoltarTelaAnterior>
                <TituloPrincipal>Pagamento</TituloPrincipal>
            </TopModal>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.txtSelecioneCartao} >Cartão de crédito</Text>
                <TouchableOpacity onPress={() => {
                    setSelecionarPgto(false)
                    setAddCartao(true)
                }}>
                    <Text style={styles.botaoMais}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.txtSelecioneCartao} >Cartão de débito</Text>
                <TouchableOpacity>
                    <Text style={styles.botaoMais}>+</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }} >
                <Text style={styles.txtSelecioneCartao} >Pix</Text>
                <TouchableOpacity>
                    <Text style={styles.botaoMais}>+</Text>
                </TouchableOpacity>
            </View>
        </View>
    </>
}

export default EscolherPgto