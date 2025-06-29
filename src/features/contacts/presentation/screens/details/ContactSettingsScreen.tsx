import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import { useAppDispatch, useAppSelector } from '../../../../../core/hooks/reduxHooks';
import { requestNotificationPermission } from '../../../data/thunks/notificationsThunks';

type Props = {
  contactId: string;
};

export const ContactSettingsScreen = ({ contactId }: Props) => {
  const { rating, setRating, contact } = useContactDetailsViewModel(contactId);
  const dispatch = useAppDispatch();
  const permissionGranted = useAppSelector(state => state.notifications.permissionGranted);
  const error = useAppSelector(state => state.notifications.error);

  const [date, setDate] = useState<Date>(new Date(Date.now() + 60 * 1000));
  const [showPicker, setShowPicker] = useState(false);
  const [calendarGranted, setCalendarGranted] = useState<boolean | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  useEffect(() => {
    dispatch(requestNotificationPermission());
    requestCalendarPermission();
  }, []);

  const requestCalendarPermission = async () => {
    try {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        setCalendarGranted(true);
        setCalendarError(null);
      } else {
        setCalendarGranted(false);
        setCalendarError('Permiso de calendario no concedido');
      }
    } catch (e) {
      setCalendarGranted(false);
      setCalendarError('Error al solicitar permiso de calendario');
    }
  };

  const retryPermissions = () => {
    dispatch(requestNotificationPermission());
    requestCalendarPermission();
  };

  const handleScheduleNotification = async () => {
    if (!permissionGranted) {
      Alert.alert('Permiso no concedido', 'Activa las notificaciones en los ajustes.');
      return;
    }

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Recordatorio: Llamar a ${contact?.name ?? 'Contacto'}`,
        body: `No olvides comunicarte.`,
        sound: 'default',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date
      },
    });

    Alert.alert('✅ Notificación agendada', `Se notificará el ${date.toLocaleString()}`);
  };

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (event.type === 'set' && selectedDate) {
      setDate(selectedDate);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: date,
      mode: 'date',
      is24Hour: true,
      onChange: (event, selectedDate) => {
        if (event.type === 'set' && selectedDate) {
          setDate(selectedDate);
        }
      },
      minimumDate: new Date(),
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación de la relación:</Text>
      <Text style={styles.score}>{rating} ⭐ </Text>

      <Button title="Agregar Estrellas" onPress={() => setRating(rating + 1)} />
      <Button title="Quitar Estrellas" onPress={() => setRating(Math.max(0, rating - 1))} />

      <View style={styles.spacer} />

      <Text style={styles.label}>Fecha y hora del recordatorio:</Text>
      <Text>{date.toLocaleString()}</Text>
      <Button title="Elegir fecha y hora" onPress={showDatePicker} />

      <Button title="Agendar recordatorio para llamar" onPress={handleScheduleNotification} />

      {(!permissionGranted || calendarGranted === false) && (
        <View style={{ marginVertical: 12 }}>
          <Text style={{ color: 'red', marginBottom: 8 }}>
            {error || calendarError}
          </Text>
          <Button title="Reintentar permisos" onPress={retryPermissions} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16 },
  score: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  spacer: { height: 24 },
});