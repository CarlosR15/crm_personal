import { ContactNotesRepository } from "../../domain/repositories/ContactNotesRepository";
import { ContactNoteEntity } from "../../domain/entities/ContactNoteEntity";
import { getNotesForContact, saveNote, updateNote, deleteNote, } from "../../../../core/storage/contactNotesStorage";

export class ContactNotesRepositoryImpl implements ContactNotesRepository {
  // Obtiene todas las notas asociadas a un contacto específico
  async getNotesForContact(contactId: string): Promise<ContactNoteEntity[]> {
    return getNotesForContact(contactId); // Delega la operación a la función de almacenamiento
  }

  // Guarda una nueva nota para un contacto
  async saveNote(note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity> {
    return saveNote(note); // Delega la operación a la función de almacenamiento
  }

  // Actualiza una nota existente
  async updateNote(note: ContactNoteEntity): Promise<void> {
    return updateNote(note); // Delega la operación a la función de almacenamiento
  }

  // Elimina una nota por su identificador
  async deleteNote(noteId: string): Promise<void> {
    return deleteNote(noteId); // Delega la operación a la función de almacenamiento
  }
}