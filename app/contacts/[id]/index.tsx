import { useLocalSearchParams } from 'expo-router';
import { ContactDetailsMainScreen } from '../../../src/features/contacts/presentation/screens/details/ContactDetailsMainScreen';

export default function ContactDetailsPage() {
  const { id } = useLocalSearchParams();
  return <ContactDetailsMainScreen id={id as string} />;
}