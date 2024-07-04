import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const [locations, setLocations] = useState([
        {
            "id": 1,
            "title": "location 1",
            "coords": {
                "latitude": -8.0656897,
                "longitude": -34.8737569,
                "icon": "home"
            }
        },
        {
            "id": 2,
            "title": "location 2",
            "coords": {
                "latitude": -8.065380,
                "longitude": -34.873414,
                "icon": "home"
            }
        },
        {
            "id": 3,
            "title": "location 3",
            "coords": {
                "latitude": -8.065485,
                "longitude": -34.877424,
                "icon": "home"
            }
        }
    ]);

    return (
        <View style={styles.container}>
            <MapView style={styles.map}>
                {locations.map(location => (
                    <Marker key={location.id}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={location.title}
                    >
                        <Ionicons name={location.namicon} size={size = 30} />
                    </Marker>
                ))}
            </MapView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
});
