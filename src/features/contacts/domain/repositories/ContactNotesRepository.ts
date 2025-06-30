import { ContactNoteEntity } from "../entities/ContactNoteEntity";

export interface ContactNotesRepository {
  //Obtiene todas las notas asociadas a un contacto específico
  getNotesForContact(contactId: string): Promise<ContactNoteEntity[]>;

  //Guarda una nueva nota para un contacto
  saveNote(note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity>;

  //Actualiza una nota existente
  updateNote(note: ContactNoteEntity): Promise<void>;

  //Elimina una nota específica
  deleteNote(noteId: string): Promise<void>;
}