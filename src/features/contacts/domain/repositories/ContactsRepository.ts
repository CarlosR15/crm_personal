import { ContactEntity } from "../entities/ContactEntity";

// Interfaz que define el contrato para el repositorio de contactos
export interface ContactsRepository {
  // Obtiene la lista completa de contactos
  getContacts(): Promise<ContactEntity[]>;
}
