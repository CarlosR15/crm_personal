import { useLocalSearchParams } from 'expo-router';
import { ContactDetailsMainScreen } from '../../../src/features/contacts/presentation/screens/details/ContactDetailsMainScreen';

export default function DetailsTab() {
  // se obtiene el parametro 'id' de la URL usando el hook useLocalSearchParams
  const { id } = useLocalSearchParams();

  // se valida que el id exista y sea de tipo string
  // Si no cumple estas condiciones, retornamos null (no renderiza nada)
  if (!id || typeof id !== 'string') return null;

  // se renderiza el componente ContactDetailsMainScreen pasando el id como prop
  return <ContactDetailsMainScreen id={id} />;
}