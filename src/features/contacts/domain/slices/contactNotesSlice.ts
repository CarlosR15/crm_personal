import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContactNoteEntity } from "../entities/ContactNoteEntity";

interface ContactNotesState {
  notes: Record<string, ContactNoteEntity[]>; // {contactId: ContactNoteEntity[]}
  loading: boolean;
  error: string | null;
}

const initialState: ContactNotesState = {
  notes: {},
  loading: false,
  error: null,
};

const contactNotesSlice = createSlice({
  name: 'contactNotes',
  initialState,
  reducers: {
    loadNotesStart(state, action: PayloadAction<string>) {
      state.loading = true;
      state.error = null;
    },
    loadNotesSuccess(state, action: PayloadAction<{contactId: string; notes: ContactNoteEntity[]}>) {
      state.notes[action.payload.contactId] = action.payload.notes;
      state.loading = false;
    },
    loadNotesFailure(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.loading = false;
    },
    addNoteSuccess(state, action: PayloadAction<ContactNoteEntity>) {
      const note = action.payload;
      if (!state.notes[note.contactId]) {
        state.notes[note.contactId] = [];
      }
      state.notes[note.contactId].push(note);
    },
    updateNoteSuccess(state, action: PayloadAction<ContactNoteEntity>) {
      const updatedNote = action.payload;
      if (state.notes[updatedNote.contactId]) {
        state.notes[updatedNote.contactId] = state.notes[updatedNote.contactId].map(
          note => note.id === updatedNote.id ? updatedNote : note
        );
      }
    },
    deleteNoteSuccess(state, action: PayloadAction<{contactId: string; noteId: string}>) {
      const { contactId, noteId } = action.payload;
      if (state.notes[contactId]) {
        state.notes[contactId] = state.notes[contactId].filter(
          note => note.id !== noteId
        );
      }
    },
  },
});

export const {
  loadNotesStart,
  loadNotesSuccess,
  loadNotesFailure,
  addNoteSuccess,
  updateNoteSuccess,
  deleteNoteSuccess,
} = contactNotesSlice.actions;

export default contactNotesSlice.reducer;