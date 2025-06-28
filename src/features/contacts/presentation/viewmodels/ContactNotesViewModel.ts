import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/reduxHooks';
import { loadNotesForContact, addNote, updateNote, deleteNote } from '../../data/thunks/contactNotesThunks';
import { shallowEqual } from 'react-redux';

export const useContactNotesViewModel = (contactId: string) => {
  const dispatch = useAppDispatch();
  const { notes, loading, error } = useAppSelector(state => {
    const contactNotes = state.contactNotes.notes[contactId] || [];
    return {
      notes: contactNotes,
      loading: state.contactNotes.loading,
      error: state.contactNotes.error,
    };
  }, shallowEqual);

  const [currentNote, setCurrentNote] = useState('');

  useEffect(() => {
    dispatch(loadNotesForContact(contactId));
  }, [contactId, dispatch]);

  const handleAddNote = async () => {
    if (!currentNote.trim()) return;
    
    await dispatch(addNote({
      contactId,
      content: currentNote,
    }));
    setCurrentNote('');
  };

  const handleUpdateNote = async (noteId: string, content: string) => {
    if (!content.trim()) return;
    
    const noteToUpdate = notes.find(n => n.id === noteId);
    if (!noteToUpdate) return;

    await dispatch(updateNote({
      ...noteToUpdate,
      content,
    }));
  };

  const handleDeleteNote = async (noteId: string) => {
    await dispatch(deleteNote(contactId, noteId));
  };

  return {
    notes,
    loading,
    error,
    currentNote,
    setCurrentNote,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
    refresh: () => dispatch(loadNotesForContact(contactId)),
  };
};