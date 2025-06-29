import { useEffect, useState } from 'react';
import { ContactsRepositoryImpl } from '../../data/repositories_impl/ContactsRepositoryImpl';
import { ContactEntity } from '../../domain/entities/ContactEntity';

const repository = new ContactsRepositoryImpl();

export const useContactsViewModel = () => {
  const [contacts, setContacts] = useState<ContactEntity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadContacts = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await repository.getContacts();
      setContacts(data);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return { contacts, loading, error, retry: loadContacts };
};