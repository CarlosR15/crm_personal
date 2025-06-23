import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';
import * as Notifications from 'expo-notifications';

export const ContactSettingsScreen = () => {
  const { id } = useLocalSearchParams();
  const { rating, setRating, contact } = useContactDetailsViewModel(id as string);

  const scheduleNotification = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: `Recuérdalo: ${contact?.name}`,
        body: 'Contacta a esta persona',
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: 2,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Calificación de la relación:</Text>
      <Text style={styles.score}>{rating} ⭐ </Text>

      <Button title="Agregar Estrellas" onPress={() => setRating(rating + 1)} />
      <Button title="Quitar Estrellas" onPress={() => setRating(Math.max(0, rating - 1))} />

      <View style={styles.spacer} />

      <Button title="Agendar recordatorio para llamar" onPress={scheduleNotification} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16 },
  score: { fontSize: 24, fontWeight: 'bold', marginVertical: 8 },
  spacer: { height: 24 },
});