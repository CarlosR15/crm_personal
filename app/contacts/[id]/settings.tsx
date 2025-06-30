import { useLocalSearchParams } from 'expo-router';
import { ContactSettingsScreen } from '../../../src/features/contacts/presentation/screens/details/ContactSettingsScreen';

export default function SettingsTab() {
  // se obtiene el parametro 'id' de la URL usando el hook useLocalSearchParams
  const { id } = useLocalSearchParams();

  // se renderiza el componente ContactNotesScreen pasando el ID del contacto como prop
  // se hace type assertion (as string) ya que se sabe que el id siempre sera string en este contexto
  return <ContactSettingsScreen contactId={id as string} />;
}