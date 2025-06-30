import AsyncStorage from '@react-native-async-storage/async-storage';

// Constante para la clave de almacenamiento de valoraciones
const STORAGE_KEY = 'contact_ratings'; // Clave única para identificar los datos en AsyncStorage

// Obtiene la valoración (rating) de un contacto específico
export const getRatingForContact = async (contactId: string): Promise<number> => {
  try {
    // 1. Obtener datos almacenados
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    
    // 2. Parsear datos o crear objeto vacío si no existen
    const data = json ? JSON.parse(json) : {};
    
    // 3. Retornar rating del contacto o 3 (valor por defecto) si no existe
    return data[contactId] ?? 3; // Operador nullish coalescing para el valor por defecto
  } catch {
    // En caso de cualquier error, retornar valor por defecto
    return 3;
  }
};

// Guarda o actualiza la valoración de un contacto
export const setRatingForContact = async (contactId: string, rating: number): Promise<void> => {
  try {
    // 1. Obtener datos existentes
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    
    // 2. Parsear datos o crear objeto vacío si no existen
    const data = json ? JSON.parse(json) : {};
    
    // 3. Actualizar rating para el contacto específico
    data[contactId] = rating;
    
    // 4. Log informativo (útil para debugging durante desarrollo)
    console.log('Guardando rating', rating, 'para contacto', contactId);
    
    // 5. Guardar datos actualizados
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    // Capturar y loggear cualquier error ocurrido durante el proceso
    console.error('Error guardando rating:', error);
  }
};