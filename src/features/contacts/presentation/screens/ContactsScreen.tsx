import React from 'react';
import { FlatList, View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { useContactsViewModel } from '../viewmodels/ContactsViewModel';
import { ContactCard } from '../components/molecules/ContactCard';

export const ContactsScreen = () => {
  const { contacts, loading, error } = useContactsViewModel();

  if (loading) return <ActivityIndicator style={styles.centered} />;
  if (error) return <Text style={styles.centered}>{error}</Text>;

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
