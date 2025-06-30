import { useEffect, useState } from 'react';
import { ContactEntity } from '../../domain/entities/ContactEntity';
import { ContactsRepositoryImpl } from '../../data/repositories_impl/ContactsRepositoryImpl';
import { getRatingForContact, setRatingForContact } from '../../../../core/storage/contactRatingsStorage';

const repository = new ContactsRepositoryImpl();

export const useContactDetailsViewModel = (id: string) => {
  const [contact, setContact] = useState<ContactEntity | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [rating, setRating] = useState(3);

  const estimateInitialRating = (contact: ContactEntity): number => {
    let score = 1;
    if (contact.phoneNumbers && contact.phoneNumbers.length > 0) score += 1;
    if (contact.emails && contact.emails.length > 0) score += 1;
    if (contact.dates && contact.dates.length > 0) score += 1;
    if ((contact.name ?? '').toLowerCase().includes('mamá') || (contact.name ?? '').toLowerCase().includes('papá')) score += 1;
    return Math.min(score, 5);
  };

  useEffect(() => {
    const loadContact = async () => {
      const all = await repository.getContacts();
      const found = all.find(c => c.id === id);
      if (found) {
        setContact(found);

        const savedRating = await getRatingForContact(id);
        if (savedRating === undefined || savedRating === null) {
          const estimated = estimateInitialRating(found);
          setRating(estimated);
          await setRatingForContact(id, estimated);
        } else {
          setRating(savedRating);
        }
      }
      setLoading(false);
    };

    loadContact();
  }, [id]);

  const saveNote = (text: string) => setNote(text);

  const updateRating = (value: number) => {
    setRating(value);
    setRatingForContact(id, value);
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