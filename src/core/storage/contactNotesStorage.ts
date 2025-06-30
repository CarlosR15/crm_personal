import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactNoteEntity } from "../../features/contacts/domain/entities/ContactNoteEntity";

// Constante para la clave de almacenamiento
const STORAGE_KEY = 'contact_notes';

// Función auxiliar para asegurar que los datos sean un array de ContactNoteEntity
const ensureNotesArray = (data: any): ContactNoteEntity[] => {
  if (Array.isArray(data)) return data; // Si ya es array, lo devuelve
  if (data && typeof data === 'object') return Object.values(data); // Si es objeto, devuelve sus valores
  return []; // En cualquier otro caso, devuelve array vacío
};

// Obtiene todas las notas asociadas a un contacto específico
export const getNotesForContact = async (contactId: string): Promise<ContactNoteEntity[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY); // Obtiene datos almacenados
    if (!json) return []; // Si no hay datos, retorna array vacío
    
    const allNotes = ensureNotesArray(JSON.parse(json)); // Parsea y normaliza los datos
    return allNotes.filter(note => note.contactId === contactId); // Filtra por contactId
  } catch (error) {
    console.error('Error getting notes:', error);
    return []; // Retorna array vacío en caso de error
  }
};

// Guarda una nueva nota para un contacto
export const saveNote = async (note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity> => {
  try {
    // Crea objeto completo de nota con campos autogenerados
    const newNote: ContactNoteEntity = {
      ...note,
      id: Date.now().toString(), // ID basado en timestamp
      createdAt: new Date().toISOString(), // Fecha creación actual
      updatedAt: new Date().toISOString(), // Fecha actualización (igual a creación inicialmente)
    };

    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    const updatedNotes = [...allNotes, newNote]; // Agrega la nueva nota
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes)); // Guarda el array actualizado
    
    return newNote; // Retorna la nota creada
  } catch (error) {
    console.error('Error saving note:', error);
    throw error; // Propaga el error para manejo externo
  }
};

// Actualiza una nota existente
export const updateNote = async (note: ContactNoteEntity): Promise<void> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    // Actualiza la nota y modifica updatedAt
    const updatedNotes = allNotes.map(n => 
      n.id === note.id ? {...note, updatedAt: new Date().toISOString()} : n
    );
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Elimina una nota por su ID
export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    // Filtra eliminando la nota con el ID especificado
    const filteredNotes = allNotes.filter(n => n.id !== noteId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};