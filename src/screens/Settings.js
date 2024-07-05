import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';

export default function Settings() {
    const [isEnabledNotifications, setIsEnabledNotifications] = useState(true);
    const [isEnabledArea, setIsEnabledArea] = useState(true);

    const toggleNotificationsSwitch = () => {
        setIsEnabledNotifications(value => !value);
    };

    const toggleAreaSwitch = () => {
        setIsEnabledArea(value => !value);
    };


    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <Ionicons name='settings' size={size = 80} color={color = '#06071C'} />
                <Text style={styles.title}>Configurações</Text>
            </View>
            <View style={styles.userDetails}>
                <Image
                    source={{ uri: 'https://freesvg.org/img/abstract-user-flat-4.png' }}
                    style={{ width: 50, height: 50 }}
                />
                <Text style={styles.text}>Usuario</Text>
            </View>
            <View style={styles.settingContainer}>
                <Text style={styles.title2}>Configurações da Conta</Text>
                <View style={styles.settingLine}>
                    <Text style={styles.text}>Editar Perfil</Text>
                    <Ionicons name='chevron-forward' size={size = 25} color={color = 'black'} />
                </View>
                <View style={styles.settingLine}>
                    <Text style={styles.text}>Alterar Senha</Text>
                    <Ionicons name='chevron-forward' size={size = 25} color={color = 'black'} />
                </View>
            </View>
            <View style={styles.settingContainer}>
                <Text style={styles.title2}>Notificações</Text>
                <View style={styles.settingLine}>
                    <Text style={styles.text}>Notificações de reporte</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#171944" }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleNotificationsSwitch}
                        value={isEnabledNotifications}
                    />
                </View>
                <View style={styles.settingLine}>
                    <Text style={styles.text}>Todas as áreas</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#171944" }}
                        thumbColor={"#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={toggleAreaSwitch}
                        value={isEnabledArea}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
    },
    header: {
        paddingTop: '15px',
        alignItems: 'center',
        gap: 15,
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
    },
    userDetails: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        backgroundColor: '#c9c9c9',
        padding: 5,
        borderRadius: 15,
        marginTop: 10,
    },
    settingContainer: {
        gap: 10,
        marginTop: 25,
        backgroundColor: '#c9c9c9',
        padding: 5,
        borderRadius: 15,
    },
    settingLine: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title2: {
        fontSize: 20,
        fontWeight: '700',
        color: '#adadad'
    },
    text: {
        fontSize: 20,
    },
});
