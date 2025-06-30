# Extraordinario React-Native typescript Carlos Rubén Romellón IGTI

## Instrucciones y comentarios

Esta aplicacion es un CRM personal, que permite ver los contactos y calificarlos basado en:
- Si su nombre contiene mamá/papá
- Número de caracteres
- Apellidos
- Etcetera

De igual manera, permite cambiar la calificacion de manera personar por contacto para que el usuario pueda tener su calificacion propia de cada contacto

Se pueden agregar Notas, así como editarlas y eliminarlas

Y agendar notificaciones como recordatorio para llamar a un contacto, este de igual manera se agenda en el calendario nativo del telefono

## Dependencias
se necesitan estas dependencias
"@expo/vector-icons"
"@react-native-async-storage/async-storage"
"@react-native-community/datetimepicker"
"@reduxjs/toolkit"
"expo":
"expo-calendar"
"expo-constants"
"expo-contacts"
"expo-device"
"expo-linking"
"expo-notifications"
"expo-router"
"expo-status-bar"
"expo-system-ui"
"react"
"react-native"
"react-native-safe-area-context
"react-native-screens"
"react-redux"

las cuales se pueden instalar manualmente
o escribir en la consola
npm i

## Estructura usada MVVM y CLEAN
1. Capa de Presentación (UI)
Componentes React Native: Pantallas (ContactsScreen, ContactNotesScreen, etc.).
ViewModels: Hooks personalizados (useContactsViewModel, useContactNotesViewModel) que:
- Gestionan el estado local.
- Se comunican con la capa de dominio.
- No contienen lógica de negocio directa.

Navegación: Usa expo-router para manejar rutas.

2. Capa de Dominio
Entidades: Modelos de datos (ContactEntity, ContactNoteEntity).

Repositorios (Interfaces): Definiciones abstractas de cómo acceder a datos (ContactsRepository, ContactNotesRepository).

3. Capa de Datos
Implementación de Repositorios:

ContactsRepositoryImpl (usa expo-contacts para acceder a la agenda del dispositivo).

ContactNotesRepositoryImpl (usa AsyncStorage para persistencia local).

APIs/Storage:

expo-calendar para eventos.

expo-notifications para push notifications.

4. Gestión de Estado Global (Redux Toolkit)
Slices:

contactNotesSlice (notas).

notificationsSlice (permisos de notificaciones).

Thunks: Acciones asíncronas (requestNotificationPermission).

## Dependencias

@expo/vector-icons	Iconos (Material Icons, etc.) en pantallas y para tabs

navegacion
expo-router y expo-linking, usado en general para la navegacion, de igual manera se usan tabs

@react-native-async-storage/async-storage sirve para guardar persistentemente notas, calificaciones y demás

expo-contacts	Accede a la agenda del teléfono (lectura/escritura)
expo-calendar	Crea eventos en el calendario del dispositivo
expo-notifications	Agenda notificaciones push (scheduleNotificationAsync)
expo-device	Detecta si es un dispositivo físico (requerido para notificaciones)
@react-native-community/datetimepicker	Selector de fecha/hora nativo (solo Android en este código)

@reduxjs/toolkit	Configura el store Redux