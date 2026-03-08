import React from "react"
import { Modal, View, ActivityIndicator } from "react-native"

const LoadingModal = (props) => {

    const { loading } = props

    return <>
        <Modal
            visible={loading}
            transparent={true}
            onRequestClose={() => {}}
            animationType='fade'
        >
            <View
                style={{
                    backgroundColor: 'rgba(125, 125, 125, 0.6)',
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator size={'small'} color={'#fff'} />
            </View>
        </Modal> 
    </>
}

export default LoadingModal