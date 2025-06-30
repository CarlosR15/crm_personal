import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { createAsyncThunk } from '@reduxjs/toolkit';

//  Acción asíncrona para solicitar permisos de notificación
export const requestNotificationPermission = createAsyncThunk(
  'notifications/requestPermission', // Tipo de acción (namespace/reducer)
  async (_, { rejectWithValue }) => { // Thunk payload creator
    try {
      // Verifica si es un dispositivo físico (no funciona en simuladores)
      if (!Device.isDevice) {
        return rejectWithValue('Solo disponible en dispositivos físicos');
      }

      // 1. Verificar estado actual de permisos
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      // 2. Solicitar permisos si no están concedidos
      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      // 3. Verificar resultado final
      if (finalStatus !== 'granted') {
        return rejectWithValue('Permiso de notificación no concedido');
      }

      return true; // Éxito
    } catch (error) {
      return rejectWithValue('Error al solicitar permisos');
    }
  }
);

// Acción asíncrona para programar una notificación
export const scheduleNotification = createAsyncThunk(
  'notifications/schedule', // Tipo de acción
  async (contactName: string, { rejectWithValue }) => { // Recibe nombre del contacto
    try {
      // Configuración de la notificación:
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de llamada',
          body: `Llama a ${contactName}`,
          sound: 'default', // Sonido por defecto
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2, // Se dispara después de 2 segundos (para demo)
        },
      });

      return true; // Éxito
    } catch (error) {
      return rejectWithValue('Error al agendar notificación');
    }
  }
);