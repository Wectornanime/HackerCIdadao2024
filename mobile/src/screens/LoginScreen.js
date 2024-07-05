import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen({ navigation }) {

    const doLogin = () => navigation.navigate('Main');

    return (
        <View style={styles.container}>
            <View style={{ height: '50%', justifyContent: 'center', alignItems: 'center' }}>
                <Image
                    source={require('./../../assets/images/hera.png')}
                    style={{ marginTop: 10, width: 270, height: 270 }}
                />
            </View>

            <View style={styles.containerLogin}>
                <View style={{ alignItems: 'center', gap: 15 }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.text}>Seja bem-vindo(a)</Text>
                        <Text style={styles.text}>a HERA</Text>
                    </View>

                    <TextInput
                        style={styles.input}
                        placeholder="admin@opp.com"
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="**********"
                    />

                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => doLogin()}
                            style={{ backgroundColor: '#095207', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 15 }}
                        >
                            <Text style={{ color: '#fff', fontSize: 16, fontWeight: '500' }}>Entrar</Text>
                        </TouchableOpacity>

                        <Text style={styles.text}>ou</Text>

                        <TouchableOpacity
                            onPress={() => doLogin()}
                        >
                            <Image
                                source={require('./../../assets/images/gov_br.png')}
                                style={{ width: 75, height: 27 }}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => doLogin()}
                    >
                        <Text style={{ color: '#2A1FA4', fontSize: 16, fontWeight: '500' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#06071C',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
    },
    containerLogin: {
        backgroundColor: '#fff',
        width: '90%',
        height: '50%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 20,
        paddingBottom: 5,
        justifyContent: 'space-between',
    },
    text: {
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#EFEFEF',
        borderRadius: 5,
        paddingHorizontal: 8,
        width: '75%',
    },
});
