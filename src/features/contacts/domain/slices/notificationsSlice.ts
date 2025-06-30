import { createSlice } from '@reduxjs/toolkit';
import { requestNotificationPermission } from '../../data/thunks/notificationsThunks';

// Tipo que define la estructura del estado de notificaciones
type NotificationState = {
  permissionGranted: boolean; // Indica si se otorgaron los permisos
  error: string | null;       // Mensaje de error en caso de fallo
};

// Estado inicial del slice de notificaciones
const initialState: NotificationState = {
  permissionGranted: false, // Sin permisos al inicio
  error: null,              // Sin errores inicialmente
};

// Slice de Redux para manejar el estado de notificaciones
const notificationsSlice = createSlice({
  name: 'notifications', // Nombre del slice (para acciones)
  initialState,          // Estado inicial definido arriba
  reducers: {},          // No hay reducers síncronos en este caso
  
  // Configuración de extraReducers para manejar acciones asíncronas
  extraReducers: builder => {
    builder
      // Caso de éxito al solicitar permisos
      .addCase(requestNotificationPermission.fulfilled, (state) => {
        state.permissionGranted = true; // Permiso concedido
        state.error = null;            // Limpia cualquier error previo
      })
      
      // Caso de fallo al solicitar permisos
      .addCase(requestNotificationPermission.rejected, (state, action) => {
        state.permissionGranted = false; // Permiso no concedido
        state.error = action.payload as string; // Almacena el mensaje de error
      });
  },
});

// Exportamos el reducer por defecto
export default notificationsSlice.reducer;