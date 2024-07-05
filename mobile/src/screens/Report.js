import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Alert, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';

export default function Report({ navigation }) {
    const apiUrl = 'http://10.200.1.182:3000/';
    const [location, setLocation] = useState(null);
    const [name, setName] = useState(null);
    const [message, setMessage] = useState(null);
    const [imageUri, setImageUri] = useState(null);
    const [region, setRegion] = useState({
        latitude: 37.78825, // Default latitude
        longitude: -122.4324, // Default longitude
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Permissão de localização não concedida',
                    'Por favor, conceda permissão de localização para obter a localização.'
                );
                return;
            }
            let locationData = await Location.getCurrentPositionAsync({});
            setLocation(locationData);
            setRegion({
                latitude: locationData.coords.latitude,
                longitude: locationData.coords.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            });
        })();

        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Desculpe, precisamos da permissão para acessar a biblioteca de fotos!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageUri(result.assets[0].uri);
        }
    };

    const handleSend = async () => {
        // Configurar os dados a serem enviados
        const data = new FormData();
        data.append('name', name);
        data.append('message', message);
        data.append('longitude', location.coords.longitude);
        data.append('latitude', location.coords.latitude);

        if (imageUri) {
            const filename = imageUri.split('/').pop();
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            data.append('image', {
                uri: imageUri,
                name: filename,
                type,
            });
        }

        // Fazer a requisição POST
        try {
            const api = `${apiUrl}reports/report`;
            const response = await axios.post(api, data, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });

            if (response.status === 201) {
                console.log(response.data);
                Alert.alert('Sucesso', response.data.message);
                setMessage('');
                setImageUri(null)
                navigation.navigate('home');
            } else {
                console.error(error);
                Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Erro', 'Ocorreu um erro ao enviar os dados.');
        };
    };

    return (
        <ScrollView style={styles.mainContainer}>
            <View style={styles.container}>
                <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Text style={styles.title}>Titulo </Text>
                    <TextInput
                        style={{ fontSize: 18, backgroundColor: '#EFEFEF', paddingHorizontal: 4, borderRadius: 4, width: '100%' }}
                        value={name}
                        onChangeText={text => setName(text)}
                    />
                </View>


                <View style={{ width: '100%', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Text style={styles.title}>Descreva a situação</Text>
                    <TextInput
                        style={styles.input}
                        numberOfLines={5}
                        multiline={true}
                        value={message}
                        onChangeText={text => setMessage(text)}
                    />
                </View>

                <View style={{ width: '100%', alignItems: 'center' }}>
                    <Text style={styles.title}>Adicionar mídia</Text>
                    <TouchableOpacity
                        style={{
                            width: 200,
                            height: 200,
                            backgroundColor: '#EFEFEF',
                            marginVertical: 5,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={pickImage}
                    >
                        {!imageUri && (
                            <Ionicons name="add-circle" size={size = 50} />
                        )}
                        {imageUri && (
                            <Image source={{ uri: imageUri }} style={{
                                width: '100%',
                                height: 200,
                            }} />
                        )}
                    </TouchableOpacity>
                    {imageUri && (
                        <TouchableOpacity
                            style={{
                                width: 200,

                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => setImageUri(null)}
                        >
                            <Text style={{ fontSize: 18, fontWeight: '600', color: 'red' }}>Remover imagem</Text>
                        </TouchableOpacity>
                    )}
                </View>

                {location && (
                    <MapView
                        style={styles.map}
                        region={region}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Sua Localização"
                        />
                    </MapView>
                )}

                {!location && (
                    <View
                        style={{
                            width: '100%',
                            height: 300,
                            backgroundColor: '#EFEFEF',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <Ionicons name='warning' size={size = 80} color={color = '#FFE976'} />
                        <Text style={{ fontSize: 16, }} >A permissão para acessar o local foi negada!</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={{ ...styles.actionButton, backgroundColor: '#171944' }}
                    onPress={handleSend}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '900' }}>Enviar</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{ ...styles.actionButton, backgroundColor: '#B22B18' }}
                    onPress={() => navigation.navigate('home')}
                >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '900' }}>Cancelar</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    mainContainer: {
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
        padding: 18,
        alignItems: 'center',
        gap: 10,
    },
    title: {
        fontWeight: '600',
        fontSize: 20
    },
    input: {
        backgroundColor: '#EFEFEF',
        minWidth: '100%',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        textAlignVertical: 'top',
    },
    workersContainer: {
        width: '100%',
    },
    carrosel: {
        gap: 10,
    },
    carroselItem: {
        margin: 2,
        gap: 2,
        alignItems: 'center',
    },
    workerImage: {
        width: 60,
        height: 60,
    },
    actionButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 15,
        padding: 5,
        alignItems: 'center',
        width: '45%',
    },
    map: {
        width: '100%',
        height: 300,
    },

});
