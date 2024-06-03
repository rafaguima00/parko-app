import React from "react"
import { createDrawerNavigator } from "@react-navigation/drawer"
import MapaPrincipal from "../Screens/Map"
import CustomDrawer from "../Components/DrawerNavigation"

function DrawerNavigation() {
    
    const Drawer = createDrawerNavigator();

    return (
        <Drawer.Navigator 
            drawerContent={() => <CustomDrawer />}
            screenOptions={{
                headerShown: false,
                drawerType: 'front'
            }} 
        >
            <Drawer.Screen name='Mapa Principal' component={MapaPrincipal} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation