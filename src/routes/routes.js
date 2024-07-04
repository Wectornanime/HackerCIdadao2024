import { NavigationContainer } from "@react-navigation/native";

import DrawerRouter from "./drawerRouter";

export default function Routes() {
    return (
        <NavigationContainer>
            <DrawerRouter />
        </NavigationContainer>
    )
}
