import AsyncStorage from '@react-native-async-storage/async-storage';
import { ContactNoteEntity } from "../../features/contacts/domain/entities/ContactNoteEntity";

const STORAGE_KEY = 'contact_notes';

const ensureNotesArray = (data: any): ContactNoteEntity[] => {
  if (Array.isArray(data)) return data;
  if (data && typeof data === 'object') return Object.values(data);
  return [];
};

export const getNotesForContact = async (contactId: string): Promise<ContactNoteEntity[]> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    if (!json) return [];
    
    const allNotes = ensureNotesArray(JSON.parse(json));
    return allNotes.filter(note => note.contactId === contactId);
  } catch (error) {
    console.error('Error getting notes:', error);
    return [];
  }
};

export const saveNote = async (note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity> => {
  try {
    const newNote: ContactNoteEntity = {
      ...note,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    const updatedNotes = [...allNotes, newNote];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
    
    return newNote;
  } catch (error) {
    console.error('Error saving note:', error);
    throw error;
  }
};

export const updateNote = async (note: ContactNoteEntity): Promise<void> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    const updatedNotes = allNotes.map(n => 
      n.id === note.id ? {...note, updatedAt: new Date().toISOString()} : n
    );
    
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedNotes));
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

export const deleteNote = async (noteId: string): Promise<void> => {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);
    const allNotes = ensureNotesArray(json ? JSON.parse(json) : []);
    
    const filteredNotes = allNotes.filter(n => n.id !== noteId);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(filteredNotes));
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};