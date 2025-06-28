import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/core/store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='index' options={{ title: "Contactos"}} />
        <Stack.Screen name='contacts/[id]' options={{ title: "Detalles"}} />
      </Stack>
    </Provider>
  );
}