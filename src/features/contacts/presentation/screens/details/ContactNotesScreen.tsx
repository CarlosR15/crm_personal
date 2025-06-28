import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useContactNotesViewModel } from '../../viewmodels/ContactNotesViewModel';

type Props = {
  contactId: string;
};

export const ContactNotesScreen = ({ contactId }: Props) => {
  const {
    notes,
    loading,
    error,
    currentNote,
    setCurrentNote,
    handleAddNote,
    handleUpdateNote,
    handleDeleteNote,
    refresh,
  } = useContactNotesViewModel(contactId);

  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingNoteContent, setEditingNoteContent] = useState('');

  const startEditing = (noteId: string, content: string) => {
    setEditingNoteId(noteId);
    setEditingNoteContent(content);
  };

  const cancelEditing = () => {
    setEditingNoteId(null);
    setEditingNoteContent('');
  };

  const saveEditing = async () => {
    if (editingNoteId) {
      await handleUpdateNote(editingNoteId, editingNoteContent);
      cancelEditing();
    }
  };

  if (loading && notes.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{error}</Text>
        <Button title="Retry" onPress={refresh} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new note..."
          value={currentNote}
          onChangeText={setCurrentNote}
          multiline
        />
        <Button
          title="Add Note"
          onPress={handleAddNote}
          disabled={!currentNote.trim()}
        />
      </View>

      <FlatList
        data={notes}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            {editingNoteId === item.id ? (
              <View style={styles.editContainer}>
                <TextInput
                  style={styles.editInput}
                  value={editingNoteContent}
                  onChangeText={setEditingNoteContent}
                  multiline
                />
                <View style={styles.editButtons}>
                  <Button title="Cancel" onPress={cancelEditing} />
                  <Button
                    title="Save"
                    onPress={saveEditing}
                    disabled={!editingNoteContent.trim()}
                  />
                </View>
              </View>
            ) : (
              <>
                <Text style={styles.noteContent}>{item.content}</Text>
                <Text style={styles.noteDate}>
                  {new Date(item.updatedAt).toLocaleString()}
                </Text>
                <View style={styles.noteActions}>
                  <Button
                    title="Edit"
                    onPress={() => startEditing(item.id, item.content)}
                  />
                  <Button
                    title="Delete"
                    color="red"
                    onPress={() => handleDeleteNote(item.id)}
                  />
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    minHeight: 60,
  },
  noteContainer: {
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 4,
    padding: 12,
    marginBottom: 12,
  },
  noteContent: {
    fontSize: 16,
    marginBottom: 8,
  },
  noteDate: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  noteActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editContainer: {
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 8,
    minHeight: 60,
  },
  editButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});