import { View, Text } from 'react-native'
import { theme } from '../../Theme';

export const Content = () => {

    const { corPrimaria, fonteNegrito } = theme;

    return (
        <View
            style={{
                width: 20,
                height: 20,
                borderRadius: 15,
                backgroundColor: corPrimaria,
                borderWidth: 2,
                borderColor: '#F6E2E9',
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <Text
                style={{
                    fontSize: 11,
                    fontFamily: fonteNegrito,
                    color: "#fff"
                }}
            >
                P
            </Text>
        </View>
    )
}