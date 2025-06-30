import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert, Platform } from 'react-native';
import { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';
import * as Notifications from 'expo-notifications';
import * as Calendar from 'expo-calendar';
import { useAppDispatch, useAppSelector } from '../../../../../core/hooks/reduxHooks';
import { requestNotificationPermission } from '../../../data/thunks/notificationsThunks';

type Props = {
  contactId: string; // ID del contacto para configuraciones
};

export const ContactSettingsScreen = ({ contactId }: Props) => {
  // Obtiene datos y funciones del ViewModel
  const { rating, setRating, contact } = useContactDetailsViewModel(contactId);

  // Redux hooks para permisos de notificación
  const dispatch = useAppDispatch();
  const permissionGranted = useAppSelector(state => state.notifications.permissionGranted);
  const error = useAppSelector(state => state.notifications.error);

  // Estados para calendario y fecha seleccionada
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [calendarGranted, setCalendarGranted] = useState<boolean | null>(null);
  const [calendarError, setCalendarError] = useState<string | null>(null);

  // Efecto para solicitar permisos al montar el componente
  useEffect(() => {
    dispatch(requestNotificationPermission());
    requestCalendarPermission();
  }, []);

  // Solicita permisos para acceder al calendario
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

  // Reintenta obtener todos los permisos necesarios
  const retryPermissions = () => {
    dispatch(requestNotificationPermission());
    requestCalendarPermission();
  };

  // Combina la fecha y hora seleccionadas en un solo objeto Date
  const getCombinedDateTime = () => {
    const date = new Date(selectedDate);
    date.setHours(selectedTime.getHours());
    date.setMinutes(selectedTime.getMinutes());
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
  };

  // Agenda una notificación y evento de calendario
  const handleScheduleNotification = async () => {
    const dateTime = getCombinedDateTime();

    if (!permissionGranted) {
      Alert.alert('Permiso no concedido', 'Activa las notificaciones en los ajustes.');
      return;
    }

    // Agenda notificación
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Recordatorio: Llamar a ${contact?.name ?? 'Contacto'}`,
        body: `No olvides comunicarte.`,
        sound: 'default',
      },
      trigger: {
        date: dateTime,
        type: Notifications.SchedulableTriggerInputTypes.DATE,
      },
    });

    // Crea evento en calendario si tiene permisos
    if (calendarGranted) {
      try {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendar = calendars.find(c => c.allowsModifications);

        if (defaultCalendar) {
          await Calendar.createEventAsync(defaultCalendar.id, {
            title: `Llamar a ${contact?.name}`,
            startDate: dateTime,
            endDate: new Date(dateTime.getTime() + 15 * 60 * 1000),
            timeZone: 'local',
            notes: 'Recordatorio generado por la app',
          });
        }
      } catch (err) {
        console.error('Error creando evento en calendario:', err);
      }
    }

    Alert.alert('✅ Recordatorio agendado', `Se notificará y se creó evento el ${dateTime.toLocaleString()}`);
  };

  // Selector de fecha/hora
  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      mode: 'date',
      is24Hour: true,
      minimumDate: new Date(),
      onChange: (event, date) => {
        if (event.type === 'set' && date) {
          setSelectedDate(date);
        }
      },
    });
  };

  // Muestra el selector de hora
  const showTimePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedTime,
      mode: 'time',
      is24Hour: true,
      onChange: (event, time) => {
        if (event.type === 'set' && time) {
          setSelectedTime(time);
        }
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación de la relación:</Text>
      <Text style={styles.score}>{rating} ⭐</Text>

      <Button title="Agregar Estrellas" onPress={() => setRating(rating + 1)} />
      <Button title="Quitar Estrellas" onPress={() => setRating(Math.max(0, rating - 1))} />

      <View style={styles.spacer} />

      <Text style={styles.label}>Fecha seleccionada:</Text>
      <Text>{selectedDate.toLocaleDateString()}</Text>
      <Button title="Elegir fecha" onPress={showDatePicker} />

      <View style={styles.spacer} />

      <Text style={styles.label}>Hora seleccionada:</Text>
      <Text>{selectedTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
      <Button title="Elegir hora" onPress={showTimePicker} />

      <View style={styles.spacer} />

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