import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../core/hooks/reduxHooks';
import { loadNotesForContact, addNote, updateNote, deleteNote } from '../../data/thunks/contactNotesThunks';
import { shallowEqual } from 'react-redux';
import { useMemo } from 'react';

// Hook personalizado para manejar la lógica de notas de contacto (ViewModel)
export const useContactNotesViewModel = (contactId: string) => {
  // Hook para despachar acciones de Redux
  const dispatch = useAppDispatch();

  // Obtiene las notas del estado global de Redux usando shallowEqual para optimización
  const { rawNotes, loading, error } = useAppSelector(state => ({
    rawNotes: state.contactNotes.notes[contactId], // Notas específicas del contacto
    loading: state.contactNotes.loading,          // Estado de carga
    error: state.contactNotes.error,              // Mensaje de error (si existe)
  }), shallowEqual); // <-- Optimiza re-renders al comparar superficialmente

  // Memoiza las notas para evitar recálculos innecesarios
  const notes = useMemo(() => rawNotes || [], [rawNotes]);

  // Estado local para la nota que se está escribiendo
  const [currentNote, setCurrentNote] = useState('');

  // Efecto para cargar las notas cuando cambia el contactId
  useEffect(() => {
    dispatch(loadNotesForContact(contactId));
  }, [contactId, dispatch]);

  // Maneja la adición de una nueva nota
  const handleAddNote = async () => {
    if (!currentNote.trim()) return; // Validación básica
    await dispatch(addNote({ contactId, content: currentNote }));
    setCurrentNote(''); // Limpia el input después de agregar
  };

  // Maneja la actualización de una nota existente
  const handleUpdateNote = async (noteId: string, content: string) => {
    if (!content.trim()) return;
    const noteToUpdate = notes.find(n => n.id === noteId);
    if (!noteToUpdate) return;
    await dispatch(updateNote({ ...noteToUpdate, content }));
  };

  // Maneja la eliminación de una nota
  const handleDeleteNote = async (noteId: string) => {
    await dispatch(deleteNote(contactId, noteId));
  };

  // Retorna el estado y métodos para interactuar con el componente
  return {
    notes,            // Lista de notas del contacto
    loading,          // Estado de carga
    error,            // Mensaje de error (si existe)
    currentNote,      // Nota actual siendo editada
    setCurrentNote,   // Función para actualizar la nota actual
    handleAddNote,    // Función para agregar nueva nota
    handleUpdateNote, // Función para actualizar nota existente
    handleDeleteNote, // Función para eliminar nota
    refresh: () => dispatch(loadNotesForContact(contactId)), // Función para recargar notas
  };
};