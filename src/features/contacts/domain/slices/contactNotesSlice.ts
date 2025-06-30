import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactNoteEntity } from "../entities/ContactNoteEntity";

// Interfaz que define la estructura del estado para las notas de contacto
interface ContactNotesState {
  notes: Record<string, ContactNoteEntity[]>; // Objeto donde las claves son contactId y los valores arrays de notas
  loading: boolean; // Flag para indicar operaciones en curso
  error: string | null; // Mensaje de error si ocurre alguno
}

// Estado inicial del slice
const initialState: ContactNotesState = {
  notes: {}, // Objeto vacío de notas
  loading: false, // No carga inicialmente
  error: null, // Sin errores al inicio
};

// Slice de Redux para manejar el estado de las notas de contacto
const contactNotesSlice = createSlice({
  name: 'contactNotes', // Nombre del slice (para acciones)
  initialState, // Estado inicial definido arriba
  reducers: {
    // Acción para indicar el inicio de carga de notas
    loadNotesStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },

    // Acción para manejar éxito al cargar notas
    loadNotesSuccess(state, action: PayloadAction<{contactId: string; notes: ContactNoteEntity[]}>) {
      state.notes[action.payload.contactId] = action.payload.notes; // Almacena notas por contactId
      state.loading = false;
    },

    // Acción para manejar fallo al cargar notas
    loadNotesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },

    // Acción para agregar una nueva nota
    addNoteSuccess(state, action: PayloadAction<ContactNoteEntity>) {
      const note = action.payload;
      if (!state.notes[note.contactId]) {
        state.notes[note.contactId] = []; // Inicializa array si no existe
      }
      state.notes[note.contactId].push(note); // Agrega la nueva nota
    },

    // Acción para actualizar una nota existente
    updateNoteSuccess(state, action: PayloadAction<ContactNoteEntity>) {
      const updatedNote = action.payload;
      if (state.notes[updatedNote.contactId]) {
        state.notes[updatedNote.contactId] = state.notes[updatedNote.contactId].map(
          note => note.id === updatedNote.id ? updatedNote : note // Reemplaza la nota actualizada
        );
      }
    },

    // Acción para eliminar una nota
    deleteNoteSuccess(state, action: PayloadAction<{contactId: string; noteId: string}>) {
      const { contactId, noteId } = action.payload;
      if (state.notes[contactId]) {
        state.notes[contactId] = state.notes[contactId].filter(
          note => note.id !== noteId // Filtra eliminando la nota con el ID especificado
        );
      }
    },
  },
});

// Exportamos las acciones generadas automáticamente
export const {
  loadNotesStart,
  loadNotesSuccess,
  loadNotesFailure,
  addNoteSuccess,
  updateNoteSuccess,
  deleteNoteSuccess,
} = contactNotesSlice.actions;

// Exportamos el reducer por defecto
export default contactNotesSlice.reducer;