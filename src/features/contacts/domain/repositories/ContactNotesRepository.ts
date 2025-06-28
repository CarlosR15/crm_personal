import { ContactNoteEntity } from "../entities/ContactNoteEntity";

export interface ContactNotesRepository {
  getNotesForContact(contactId: string): Promise<ContactNoteEntity[]>;
  saveNote(note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>): Promise<ContactNoteEntity>;
  updateNote(note: ContactNoteEntity): Promise<void>;
  deleteNote(noteId: string): Promise<void>;
}