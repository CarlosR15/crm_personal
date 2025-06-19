import { ContactEntity } from "../entities/ContactEntity";

export interface ContactsRepository {
  getContacts(): Promise<ContactEntity[]>;
}
