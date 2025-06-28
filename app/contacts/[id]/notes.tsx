import { useLocalSearchParams } from 'expo-router';
import { ContactNotesScreen } from '../../../src/features/contacts/presentation/screens/details/ContactNotesScreen';

export default function NotesTab() {
  const { id } = useLocalSearchParams();
  return <ContactNotesScreen contactId={id as string} />;
}