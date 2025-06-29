import { createSlice } from '@reduxjs/toolkit';
import { requestNotificationPermission } from '../../data/thunks/notificationsThunks';

type NotificationState = {
  permissionGranted: boolean;
  error: string | null;
};

const initialState: NotificationState = {
  permissionGranted: false,
  error: null,
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(requestNotificationPermission.fulfilled, (state) => {
        state.permissionGranted = true;
        state.error = null;
      })
      .addCase(requestNotificationPermission.rejected, (state, action) => {
        state.permissionGranted = false;
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;