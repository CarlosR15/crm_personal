import { useLocalSearchParams } from 'expo-router';
import { ContactDetailsMainScreen } from '../../../src/features/contacts/presentation/screens/details/ContactDetailsMainScreen';

export default function DetailsTab() {
  const { id } = useLocalSearchParams();

  if (!id || typeof id !== 'string') return null;

  return <ContactDetailsMainScreen id={id} />;
}