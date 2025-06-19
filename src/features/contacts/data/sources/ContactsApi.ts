import * as Contacts from 'expo-contacts';

export const fetchContacts = async () => {
  const { status } = await Contacts.requestPermissionsAsync();
  if (status !== 'granted') throw new Error('Permiso denegado');

  const { data } = await Contacts.getContactsAsync({
    fields: [Contacts.Fields.Image],
  });

  return data;
};