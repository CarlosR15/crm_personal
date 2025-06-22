import { useEffect, useState } from 'react';
import { ContactEntity } from '../../domain/entities/ContactEntity';
import { ContactsRepositoryImpl } from '../../data/repositories_impl/ContactsRepositoryImpl';

const repository = new ContactsRepositoryImpl();

export const useContactDetailsViewModel = (id: string) => {
  const [contact, setContact] = useState<ContactEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(3);

  useEffect(() => {
    const loadContact = async () => {
      try {
        const all = await repository.getContacts();
        const found = all.find(c => c.id === id);
        if (found) setContact(found);
      } finally {
        setLoading(false);
      }
    };
    loadContact();
  }, [id]);

  const saveNote = (text: string) => {
    setNote(text);
  };

  const updateRating = (value: number) => {
    setRating(value);
  };

  return {
    contact,
    loading,
    note,
    rating,
    setNote: saveNote,
    setRating: updateRating,
  };
};