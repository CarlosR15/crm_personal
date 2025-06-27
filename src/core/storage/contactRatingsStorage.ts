import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'contact_ratings';

export const getRatingForContact = async (contactId: string): Promise<number> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const data = json ? JSON.parse(json) : {};
    return data[contactId] ?? 3;
  } catch {
    return 3;
  }
};

export const setRatingForContact = async (contactId: string, rating: number): Promise<void> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const data = json ? JSON.parse(json) : {};
    data[contactId] = rating;
    console.log('Guardando rating', rating, 'para contacto', contactId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error guardando rating:', error);
  }
};