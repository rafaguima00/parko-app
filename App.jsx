import 'react-native-gesture-handler'
import { StatusBar } from 'expo-status-bar'
import { View } from 'react-native'
import StackNavigator from './src/Navigation/stackNavigator'
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import * as SplashScreen from 'expo-splash-screen'
import { useCallback } from 'react'
import { DataUserProvider } from './src/Context/dataUserContext'
import { ReservaProvider } from './src/Context/reservaContext'
import { PaymentProvider } from './src/Context/paymentContext'

SplashScreen.preventAutoHideAsync()

export default function App() {

  const [fontsLoaded] = useFonts({
    Roboto_400Regular, 
    Roboto_700Bold
  })

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded) {
    return null
  }

  return (
    <DataUserProvider>
      <ReservaProvider>
        <PaymentProvider>
          <View 
            style={{ flex: 1 }} 
            onLayout={onLayoutRootView}
          >
            <StackNavigator />
            <StatusBar style="auto" />
          </View>
        </PaymentProvider>
      </ReservaProvider>
    </DataUserProvider>
  )
}
