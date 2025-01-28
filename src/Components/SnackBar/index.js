import React from "react"
import { Snackbar } from "react-native-paper"
import { View } from "react-native"

export default function Alerta({ 
    message, 
    error=false, 
    setError 
}) {
    return (
        <View 
            style={{
                backgroundColor: "red",
                display: error ? "flex" : "none",
                justifyContent: "center",
                marginTop: 36
            }}
        >
            <Snackbar
                visible={error}
                onDismiss={() => setError(false)}
                duration={4000}
                action={{
                    label:"OK",
                    onPress: () => {
                        setError(false)
                    }
                }}
            >
                {message}
            </Snackbar>
        </View>
    )
}