import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ContactAvatar } from '../atoms/ContactAvatar';
import { ContactEntity } from '../../../domain/entities/ContactEntity';

export const ContactCard = ({ contact }: { contact: ContactEntity }) => (
  <View style={styles.card}>
    <ContactAvatar uri={contact.image} />
    <Text style={styles.name}>{contact.name}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
  },
  name: {
    marginLeft: 12,
    fontSize: 16,
    fontWeight: '500',
  },
});
