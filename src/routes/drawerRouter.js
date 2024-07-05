import { createDrawerNavigator } from "@react-navigation/drawer";

import HomeScreen from "../screens/HomeScreen";
import Settings from "../screens/Settings";

const Drawer = createDrawerNavigator();

export default function DrawerRouter() {
    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Settings" component={Settings} />
        </Drawer.Navigator>
    )
}
