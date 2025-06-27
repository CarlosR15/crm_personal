import { useLocalSearchParams } from 'expo-router';
import { ContactSettingsScreen } from '../../../src/features/contacts/presentation/screens/details/ContactSettingsScreen';

export default function SettingsTab() {
  const { id } = useLocalSearchParams();
  console.log("ID from params:", id);
  return <ContactSettingsScreen contactId={id as string} />;
}