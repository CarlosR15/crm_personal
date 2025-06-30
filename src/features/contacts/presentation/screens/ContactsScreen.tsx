import React from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet, Button } from 'react-native';
import { useContactsViewModel } from '../viewmodels/ContactsViewModel';
import { ContactCard } from '../components/molecules/ContactCard';

export const ContactsScreen = () => {
  // Obtiene datos y funciones del ViewModel
  const { 
    contacts,  // Lista de contactos
    loading,   // Estado de carga
    error,     // Mensaje de error (si existe)
    retry      // Función para reintentar carga
  } = useContactsViewModel();
// Estado de carga - muestra spinner
  if (loading) return <ActivityIndicator style={styles.centered} />;

  // Estado de error - muestra mensaje y botón de reintentoif (loading) return <ActivityIndicator style={styles.centered} />;
  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={{ marginBottom: 12 }}>{error}</Text>
        <Button title="Reintentar permisos" onPress={retry} />
      </View>
    );
  }
  // Estado normal - muestra lista de contactos
  return (
    <FlatList
      contentContainerStyle={styles.list}
      data={contacts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ContactCard contact={item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  list: { padding: 16 },
});
