import { createSlice } from '@reduxjs/toolkit';
import { requestNotificationPermission, scheduleNotification } from '../../data/thunks/notificationsThunks';

type NotificationState = {
  permissionGranted: boolean;
  scheduledIds: string[];
  error?: string;
};

const initialState: NotificationState = {
  permissionGranted: false,
  scheduledIds: [],
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(requestNotificationPermission.fulfilled, (state) => {
        state.permissionGranted = true;
        state.error = undefined;
      })
      .addCase(requestNotificationPermission.rejected, (state, action) => {
        state.permissionGranted = false;
        state.error = action.payload as string;
      })
      .addCase(scheduleNotification.fulfilled, (state, action) => {
        state.scheduledIds.push(action.payload);
        state.error = undefined;
      })
      .addCase(scheduleNotification.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export default notificationsSlice.reducer;