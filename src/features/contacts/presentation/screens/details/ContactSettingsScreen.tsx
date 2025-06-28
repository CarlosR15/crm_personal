import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';
// import * as Notifications from 'expo-notifications';
import { useAppDispatch, useAppSelector } from '../../../../../core/hooks/reduxHooks';
import { requestNotificationPermission, scheduleNotification } from '../../../data/thunks/notificationsThunks';

type Props = {
  contactId: string;
};

export const ContactSettingsScreen = ({ contactId }: Props) => {
  const { rating, setRating, contact } = useContactDetailsViewModel(contactId);
  console.log(contact?.id, rating);

  const dispatch = useAppDispatch();
  const permissionGranted = useAppSelector(state => state.notifications.permissionGranted);
  const error = useAppSelector(state => state.notifications.error);

  useEffect(() => {
    dispatch(requestNotificationPermission());
  }, []);

  const handleSchedule = () => {
    if (!permissionGranted) {
      Alert.alert('Permiso no concedido', 'Activa las notificaciones en los ajustes.');
      return;
    }
    dispatch(scheduleNotification(contact?.name ?? 'Alguien'));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación de la relación:</Text>
      <Text style={styles.score}>{rating} ⭐ </Text>

      <Button title="Agregar Estrellas" onPress={() => setRating(rating + 1)} />
      <Button title="Quitar Estrellas" onPress={() => setRating(Math.max(0, rating - 1))} />

      <View style={styles.spacer} />
      <Button title="Agendar recordatorio para llamar" onPress={handleSchedule} />

      {error && <Text style={{ color: 'red' }}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16 },
  score: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  spacer: { height: 24 },
});
