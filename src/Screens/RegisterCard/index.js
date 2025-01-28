import React from "react"
import { SafeAreaView, KeyboardAvoidingView, Platform } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { styles } from "./style"
import FormCard from "../../Components/FormCard"
import ViewCard from "../../Components/ViewCard"
import TopArrowLeft from "../../Components/TopArrowLeft"

export default function RegisterCard() {
    return <>
        <SafeAreaView style={styles.areaContent}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView>
                    <TopArrowLeft children={"Adicionar Cartão"} />
                    <ViewCard />
                    <FormCard />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    </>
}