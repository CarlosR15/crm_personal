import { useRouter } from 'expo-router';
import { Pressable, Text, StyleSheet, View } from 'react-native';
import { ContactEntity } from '../../../domain/entities/ContactEntity';

type Props = {
  contact: ContactEntity;
};

export const ContactCard = ({ contact }: Props) => {
  const router = useRouter();

  return (
    <Pressable onPress={() => router.push(`/contacts/${contact.id}`)} style={styles.card}>
      <Text style={styles.name}>{contact.name}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
