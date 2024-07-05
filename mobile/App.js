import { SafeAreaView, StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import Routes from './src/routes/routes';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <Routes />
    </SafeAreaView>
  );
}
