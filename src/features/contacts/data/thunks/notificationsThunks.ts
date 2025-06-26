import * as Notifications from 'expo-notifications';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const requestNotificationPermission = createAsyncThunk(
  'notifications/requestPermission',
  async (_, { rejectWithValue }) => {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      return rejectWithValue('Permiso denegado');
    }
    return true;
  }
);

export const scheduleNotification = createAsyncThunk(
  'notifications/schedule',
  async (contactName: string, { rejectWithValue }) => {
    try {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: `Recuérdalo: ${contactName}`,
          body: 'Contacta a esta persona',
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
          seconds: 2,
        },
      });
      return id;
    } catch (e) {
      return rejectWithValue('Error al agendar notificación');
    }
  }
);