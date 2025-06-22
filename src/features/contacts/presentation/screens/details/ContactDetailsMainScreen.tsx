import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';

type Props = {
  id: string;
};

export const ContactDetailsMainScreen = ({ id }: Props) => {
  const { contact, loading } = useContactDetailsViewModel(id);

  if (loading) return <ActivityIndicator style={styles.centered} />;
  if (!contact) return <Text style={styles.centered}>Contacto no encontrado</Text>;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del contacto</Text>
      <Text>ID: {id}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 18, fontWeight: 'bold' },
});