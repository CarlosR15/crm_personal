import { ContactsRepository } from '../../domain/repositories/ContactsRepository';
import { ContactEntity } from '../../domain/entities/ContactEntity';
import { fetchContacts } from '../sources/ContactsApi';

// Implementación concreta del repositorio de contactos
export class ContactsRepositoryImpl implements ContactsRepository {
  // Obtiene la lista de contactos procesados
  async getContacts(): Promise<ContactEntity[]> {
    // 1. Obtener datos crudos de la API
    const rawContacts = await fetchContacts();

    // 2. Procesar y transformar los datos:
    return rawContacts
      // Filtrado: elimina contactos sin ID o nombre
      .filter(c => c.id && c.name)
      // Mapeo: convierte a entidad de dominio
      .map(c => ({
        id: c.id!, // Non-null assertion (ya filtramos nulls)
        name: c.name ?? 'Sin nombre', // Fallback para nombre
        image: c.imageAvailable && c.image ? c.image.uri : undefined, // Imagen condicional
      }));
  }
}