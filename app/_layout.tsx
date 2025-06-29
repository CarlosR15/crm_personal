import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { store } from '../src/core/store';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name='index' options={{ title: 'Contactos' }} />
        <Stack.Screen name='contacts/[id]' options={{ title: 'Detalles' }} />
      </Stack>
    </Provider>
  );
}