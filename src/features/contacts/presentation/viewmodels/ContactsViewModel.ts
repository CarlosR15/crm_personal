import { useEffect, useState } from 'react';
import { ContactsRepositoryImpl } from '../../data/repositories_impl/ContactsRepositoryImpl';
import { ContactEntity } from '../../domain/entities/ContactEntity';

// Instancia del repositorio para obtener los contactos
const repository = new ContactsRepositoryImpl();

//  Hook personalizado para manejar la lógica de la lista de contactos (ViewModel)
export const useContactsViewModel = () => {
  // Estados del ViewModel
  const [contacts, setContacts] = useState<ContactEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Función para cargar los contactos desde el repositorio
  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await repository.getContacts();
      setContacts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Efecto para cargar los contactos al montar el componente
  useEffect(() => {
    loadContacts();
  }, []);

  // Retorna el estado y métodos para interactuar con el componente
  return { 
    contacts, // Lista de contactos
    loading,  // Estado de carga
    error,    // Mensaje de error (si existe)
    retry: loadContacts // Función para reintentar la carga
  };
};