import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import Login from "../Screens/Login"
import Register from "../Screens/Register"
import Profile from "../Screens/Profile"
import DrawerNavigation from "./drawerNavigator"
import Vehicles from "../Screens/Vehicles"
import RegisterVehicle from "../Screens/RegisterVehicle"
import Reservations from "../Screens/Reservations"
import Payments from "../Screens/Payments"
import RegisterCard from "../Screens/RegisterCard"
import Favorites from "../Screens/Favorites"
import Dashboard from "../Screens/Dashboard"
import TempoEspera from "../Screens/TimeReservation"
import Ajuda from "../Screens/Ajuda"
import Onboarding from "../Screens/Onboarding"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"

const StackNavigator = () => {

    const Stack = createStackNavigator()
    
    const [isFirstLaunch, setIsFirstLaunch] = useState(null)

    useEffect(() => {
        AsyncStorage.getItem('alreadyLaunched').then(value => {
            if (value === null) {
                AsyncStorage.setItem('alreadyLaunched', 'true')
                setIsFirstLaunch(true)
            } else {
                setIsFirstLaunch(false)
            }
        })
    }, [])

    if (isFirstLaunch === null) return null

    return(
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName={isFirstLaunch ? "Onboarding" : "Login"}
                screenOptions={{
                    gestureEnabled: true,
                    headerShown: false
                }}
            >
                <Stack.Screen name="Onboarding" component={Onboarding} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Map" component={DrawerNavigation} />
                <Stack.Screen name="Profile" component={Profile} />
                <Stack.Screen name="Veiculos" component={Vehicles} />
                <Stack.Screen name="Register Vehicle" component={RegisterVehicle} />
                <Stack.Screen name="Reservas" component={Reservations} />
                <Stack.Screen name="Pagamento" component={Payments} />
                <Stack.Screen name="Cadastrar Cartao" component={RegisterCard} />
                <Stack.Screen name="Favoritos" component={Favorites} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="Tempo de Espera" component={TempoEspera} />
                <Stack.Screen name="Ajuda" component={Ajuda} />
                {/* <Stack.Screen name="Descontos" component={Descontos} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default StackNavigator