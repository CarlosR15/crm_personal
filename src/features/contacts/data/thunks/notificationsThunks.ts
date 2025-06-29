import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const requestNotificationPermission = createAsyncThunk(
  'notifications/requestPermission',
  async (_, { rejectWithValue }) => {
    try {
      if (!Device.isDevice) {
        return rejectWithValue('Solo disponible en dispositivos físicos');
      }

      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;

      if (status !== 'granted') {
        const { status: newStatus } = await Notifications.requestPermissionsAsync();
        finalStatus = newStatus;
      }

      if (finalStatus !== 'granted') {
        return rejectWithValue('Permiso de notificación no concedido');
      }

      return true;
    } catch (error) {
      return rejectWithValue('Error al solicitar permisos');
    }
  }
);

export const scheduleNotification = createAsyncThunk(
  'notifications/schedule',
  async (contactName: string, { rejectWithValue }) => {
    try {
      const trigger = new Date(Date.now() + 5 * 1000);

      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'Recordatorio de llamada',
          body: `Llama a ${contactName}`,
          sound: 'default',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });

      return true;
    } catch (error) {
      return rejectWithValue('Error al agendar notificación');
    }
  }
);