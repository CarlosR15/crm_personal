import { useEffect, useState } from 'react';
import { ContactEntity } from '../../domain/entities/ContactEntity';
import { ContactsRepositoryImpl } from '../../data/repositories_impl/ContactsRepositoryImpl';
import { getRatingForContact, setRatingForContact } from '../../../../core/storage/contactRatingsStorage';

// Instancia del repositorio para obtener contactos
const repository = new ContactsRepositoryImpl();

// Hook personalizado para manejar la lógica de la pantalla de detalles de contacto
export const useContactDetailsViewModel = (id: string) => {
  // Estados del componente
  const [contact, setContact] = useState<ContactEntity | null>(null); // Datos del contacto
  const [loading, setLoading] = useState(true); // Estado de carga
  const [note, setNote] = useState(''); // Nota temporal del contacto
  const [rating, setRating] = useState(3); // Calificación del contacto (valor por defecto: 3)

  // Calcula una calificación inicial basada en los datos del contacto
  const estimateInitialRating = (contact: ContactEntity): number => {
    let score = 1; // Puntuación base
    
    // Lógica de puntuación basada en datos disponibles
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) score += 1;
    if (contact.emails && contact.emails.length > 0) score += 1;
    if (contact.dates && contact.dates.length > 0) score += 1;
    
    // Bonus para contactos familiares
    if ((contact.name ?? '').toLowerCase().includes('mamá') || 
        (contact.name ?? '').toLowerCase().includes('papá')) score += 1;
    
    return Math.min(score, 5); // Asegura que no exceda el máximo de 5
  };

  // Efecto para cargar los datos del contacto al montar el componente o cambiar el ID
  useEffect(() => {
    const loadContact = async () => {
      try {
        const all = await repository.getContacts();
        const found = all.find(c => c.id === id);
        
        if (found) {
          setContact(found);

          // Obtiene o calcula la calificación
          const savedRating = await getRatingForContact(id);
          if (savedRating === undefined || savedRating === null) {
            const estimated = estimateInitialRating(found);
            setRating(estimated);
            await setRatingForContact(id, estimated); // Guarda la calificación estimada
          } else {
            setRating(savedRating); // Usa la calificación guardada
          }
        }
      } catch (error) {
        console.error('Error loading contact:', error);
      } finally {
        setLoading(false);
      }
    };

    loadContact();
  }, [id]);

  // Guarda una nota temporal para el contacto
  const saveNote = (text: string) => setNote(text);

  // Actualiza la calificación del contacto y la guarda en almacenamiento persistente
  const updateRating = (value: number) => {
    setRating(value);
    setRatingForContact(id, value);
  };

  // Retorna el estado y métodos para interactuar con el componente
  return {
    contact,      // Datos del contacto
    loading,      // Estado de carga
    note,         // Nota temporal
    rating,       // Calificación actual
    setNote: saveNote,     // Método para guardar nota
    setRating: updateRating, // Método para actualizar calificación
  };
};