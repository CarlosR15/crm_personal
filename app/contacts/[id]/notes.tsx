import { useLocalSearchParams } from 'expo-router';
import { ContactNotesScreen } from '../../../src/features/contacts/presentation/screens/details/ContactNotesScreen';

export default function NotesTab() {
  // se obtiene el parametro 'id' de la URL usando el hook useLocalSearchParams
  const { id } = useLocalSearchParams();

  // se renderiza el componente ContactNotesScreen pasando el ID del contacto como prop
  // se hace type assertion (as string) ya que se sabe que el id siempre sera string en este contexto
  return <ContactNotesScreen contactId={id as string} />;
}