import * as Contacts from 'expo-contacts';

// Función para obtener los contactos del dispositivo
export const fetchContacts = async () => {
  // 1. Solicitar permisos para acceder a los contactos
  const { status } = await Contacts.requestPermissionsAsync();
  
  // 2. Verificar si los permisos fueron concedidos
  if (status !== 'granted') {
    throw new Error('Permiso denegado'); // Lanza error si no se tienen permisos
  }

  // 3. Obtener los contactos con campos específicos
  const { data } = await Contacts.getContactsAsync({
    fields: [
      Contacts.Fields.Image,       // Imagen/avatar del contacto
      Contacts.Fields.PhoneNumbers, // Números de teléfono
      Contacts.Fields.Emails,      // Direcciones de email
      Contacts.Fields.Dates,       // Fechas importantes (cumpleaños, etc.)
    ],
  });

  // 4. Retornar los datos de contactos obtenidos
  return data;
};