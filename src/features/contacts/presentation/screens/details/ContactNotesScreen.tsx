import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';

export const ContactNotesScreen = () => {
  const { id } = useLocalSearchParams();
  const { note, setNote } = useContactDetailsViewModel(id as string);

   return (
    <View style={styles.container}>
      <Text style={styles.label}>Notas para este contacto</Text>
      <TextInput
        style={styles.input}
        value={note}
        onChangeText={setNote}
        placeholder="Ej: Tiene un perro que se llama Max"
        multiline
      />
      <Text style={styles.saved}>Nota guardada: {note}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontSize: 16, marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    minHeight: 80,
    textAlignVertical: 'top',
  },
  saved: { marginTop: 12, color: 'green' },
});