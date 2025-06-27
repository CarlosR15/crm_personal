import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useContactDetailsViewModel } from '../../viewmodels/ContactDetailsViewModel';

type Props = {
  id: string;
};

export const ContactDetailsMainScreen = ({ id }: Props) => {
  const { contact, loading } = useContactDetailsViewModel(id);
  console.log('[ContactDetailsMainScreen] Recibiendo id:', id);

  if (loading) return <ActivityIndicator style={styles.centered} />;
  if (!contact) return <Text style={styles.centered}>Contacto no encontrado</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Información del contacto</Text>

      <View style={styles.imageContainer}>
        {contact.image ? (
          <Image
            source={{ uri: contact.image }}
            style={styles.image}
          />
        ) : (
          <MaterialCommunityIcons
            name="account-circle"
            size={100}
            color="#cccccc"
          />
        )}
      </View>

      <Text style={styles.contactName}>{contact.name}</Text>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignItems: 'center'
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15
  },
  contactName: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10
  },
  imageContainer: {
    elevation: 3,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});