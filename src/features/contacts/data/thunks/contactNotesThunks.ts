import { AppDispatch } from "../../../../core/store";
import { ContactNoteEntity } from "../../domain/entities/ContactNoteEntity";
import { addNoteSuccess, deleteNoteSuccess, loadNotesFailure, loadNotesStart, loadNotesSuccess, updateNoteSuccess } from "../../domain/slices/contactNotesSlice";
import { ContactNotesRepositoryImpl } from "../repositories_impl/ContactNotesRepositoryImpl";

// Instancia del repositorio para operaciones con notas
const repository = new ContactNotesRepositoryImpl();

// Thunk action para cargar notas de un contacto
export const loadNotesForContact = (contactId: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(loadNotesStart(contactId)); // Indica inicio de carga
    const notes = await repository.getNotesForContact(contactId); // Obtiene notas del repositorio
    dispatch(loadNotesSuccess({ contactId, notes })); // Nota éxito con datos
  } catch (error) {
    // Maneja error convirtiéndolo a mensaje
    dispatch(loadNotesFailure(error instanceof Error ? error.message : 'Unknown error'));
  }
};

// Thunk action para agregar una nueva nota
export const addNote = (note: Omit<ContactNoteEntity, 'id' | 'createdAt' | 'updatedAt'>) => async (dispatch: AppDispatch) => {
  try {
    const savedNote = await repository.saveNote(note); // Guarda en repositorio
    dispatch(addNoteSuccess(savedNote)); // Nota éxito con nota guardada
  } catch (error) {
    console.error('Error adding note:', error); // Log de error
  }
};

// Thunk action para actualizar una nota existente
export const updateNote = (note: ContactNoteEntity) => async (dispatch: AppDispatch) => {
  try {
    await repository.updateNote(note); // Actualiza en repositorio
    dispatch(updateNoteSuccess(note)); // Nota éxito con nota actualizada
  } catch (error) {
    console.error('Error updating note:', error); // Log de error
  }
};

// Thunk action para eliminar una nota
export const deleteNote = (contactId: string, noteId: string) => async (dispatch: AppDispatch) => {
  try {
    await repository.deleteNote(noteId); // Elimina del repositorio
    dispatch(deleteNoteSuccess({ contactId, noteId })); // Nota éxito con IDs
  } catch (error) {
    console.error('Error deleting note:', error); // Log de error
  }
};