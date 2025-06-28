import { ContactNotesRepository } from "../../domain/repositories/ContactNotesRepository";
import { ContactNoteEntity } from "../../domain/entities/ContactNoteEntity";
import { getNotesForContact, saveNote, updateNote, deleteNote, } from "../../../../core/storage/contactNotesStorage";

export class ContactNotesRepositoryImpl implements ContactNotesRepository {
  async getNotesForContact(contactId: string): Promise<ContactNoteEntity[]> {
    return getNotesForContact(contactId);
  }

  async saveNote(note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity> {
    return saveNote(note);
  }

  async updateNote(note: ContactNoteEntity): Promise<void> {
    return updateNote(note);
  }

  async deleteNote(noteId: string): Promise<void> {
    return deleteNote(noteId);
  }
}