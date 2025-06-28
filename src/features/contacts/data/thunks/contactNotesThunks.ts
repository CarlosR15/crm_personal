import { AppDispatch } from "../../../../core/store";
import { ContactNoteEntity } from "../../domain/entities/ContactNoteEntity";
import { addNoteSuccess, deleteNoteSuccess, loadNotesFailure, loadNotesStart, loadNotesSuccess, updateNoteSuccess } from "../../domain/slices/contactNotesSlice";
import { ContactNotesRepositoryImpl } from "../repositories_impl/ContactNotesRepositoryImpl";

const repository = new ContactNotesRepositoryImpl();

export const loadNotesForContact = (contactId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadNotesStart(contactId));
    const notes = await repository.getNotesForContact(contactId);
    dispatch(loadNotesSuccess({ contactId, notes }));
  } catch (error) {
    dispatch(loadNotesFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
};

export const addNote = (note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
  try {
    const savedNote = await repository.saveNote(note);
    dispatch(addNoteSuccess(savedNote));
  } catch (error) {
    console.error('Error adding note:', error);
  }
};

export const updateNote = (note: ContactNoteEntity) => async (dispatch: AppDispatch) => {
  try {
    await repository.updateNote(note);
    dispatch(updateNoteSuccess(note));
  } catch (error) {
    console.error('Error updating note:', error);
  }
};

export const deleteNote = (contactId: string, noteId: string) => async (dispatch: AppDispatch) => {
  try {
    await repository.deleteNote(noteId);
    dispatch(deleteNoteSuccess({ contactId, noteId }));
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};