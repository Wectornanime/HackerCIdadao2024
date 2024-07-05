import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';

export default function HomeScreen() {
    const [region, setRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [riskLocation, setRiskLocation] = useState([]);

    const findRisks = async () => {
        try {
            const response = await axios.get('http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=5eaed1e8-aa7f-48d7-9512-638f80874870');
            let data = [];
            response.data.result.records.map(rec => {
                if (rec.latitude && rec.longitude) {
                    data.push({
                        "id": rec._id,
                        "title": rec.solicitacao_endereco,
                        "coords": {
                            "latitude": rec.latitude,
                            "longitude": rec.longitude
                        },
                        "icon": "alert-circle"
                    })
                }
            })

            setRiskLocation(data)
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
            throw error; // Trate o erro conforme necessário
        }
    };

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('A permissão para acessar o local foi negada!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});

            setUserLocation(location);
            setRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
            });
        })();

        findRisks();
    }, []);

    return (
        <View style={styles.container} region={region}>
            <MapView style={styles.map} region={region}>

                {userLocation && (
                    <Marker
                        coordinate={{
                            latitude: userLocation.coords.latitude,
                            longitude: userLocation.coords.longitude,
                        }}
                        title="Você está aqui"
                    />
                )}

                {riskLocation.map(location => (
                    <Marker key={location.id}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={location.title}
                    >
                        <Ionicons name={location.icon} size={size = 30} />
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
