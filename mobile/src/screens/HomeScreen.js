import { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
    const [region, setRegion] = useState(null);
    const [userLocation, setUserLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [riskLocation, setRiskLocation] = useState([]);

    const findRisks = async () => {
        try {
            const response = await axios.get('http://dados.recife.pe.gov.br/api/3/action/datastore_search?resource_id=5eaed1e8-aa7f-48d7-9512-638f80874870');
            let data = [];
            for (let rec of response.data.result.records) {
                if (rec.latitude && rec.longitude) {
                    data.push({
                        id: rec._id,
                        title: rec.solicitacao_endereco,
                        coords: {
                            latitude: parseFloat(rec.latitude),
                            longitude: parseFloat(rec.longitude)
                        },
                        icon: "alert-circle"
                    });
                } else {
                    let geo = await Location.geocodeAsync(rec.solicitacao_endereco);
                    if (geo.length > 0) {
                        data.push({
                            id: rec._id,
                            title: rec.solicitacao_endereco,
                            coords: {
                                latitude: geo[0].latitude,
                                longitude: geo[0].longitude
                            },
                            icon: "alert-circle"
                        });
                    }
                }
            }
            setRiskLocation(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
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
        <View style={styles.container}>
            <MapView style={styles.map} region={region} showsUserLocation={true}>

                {riskLocation.map(location => (
                    <Marker key={location.id}
                        coordinate={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                        }}
                        title={location.title}
                    >
                        <View style={styles.markerIcon}>
                            <Ionicons name={location.icon} size={30} color="red" />
                        </View>
                    </Marker>
                ))}
            </MapView>
            {errorMsg ? <Text style={styles.errorMsg}>{errorMsg}</Text> : null}
        </View>
    );
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
    markerIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorMsg: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        color: 'red',
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        textAlign: 'center',
    },
});
