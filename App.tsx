import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import 'expo-router/entry';
import RootLayout from './app/_layout';
import { store } from './src/core/store';
import { Provider } from 'react-redux';

export default function App() {
  return (
    <Provider store={store}>
      <View style={styles.container}>
        <RootLayout />
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
