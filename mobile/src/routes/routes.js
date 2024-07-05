import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DrawerRouter from "./drawerRouter";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen} />
                <Stack.Screen name="Main" component={DrawerRouter} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
