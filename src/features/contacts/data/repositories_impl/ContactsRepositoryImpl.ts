import { ContactsRepository } from '../../domain/repositories/ContactsRepository';
import { ContactEntity } from '../../domain/entities/ContactEntity';
import { fetchContacts } from '../sources/ContactsApi';

export class ContactsRepositoryImpl implements ContactsRepository {
  async getContacts(): Promise<ContactEntity[]> {
    const rawContacts = await fetchContacts();

    return rawContacts
      .filter(c => c.id && c.name)
      .map(c => ({
        id: c.id!,
        name: c.name ?? 'Sin nombre',
        image: c.imageAvailable && c.image ? c.image.uri : undefined,
      }));
  }
}
