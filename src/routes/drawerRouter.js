import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";
import LoginScreen from "../screens/LoginScreen";

const Drawer = createDrawerNavigator();

export default function DrawerRouter() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen
                name="login"
                component={LoginScreen}
                options={{
                    title: "Mapa"
                }}
            />
            <Drawer.Screen
                name="home"
                component={HomeScreen}
                options={{
                    title: "Mapa"
                }}
            />
            <Drawer.Screen
                name="settings"
                component={Settings}
                options={{
                    title: "Configurações"
                }}
            />
        </Drawer.Navigator>
    )
}
