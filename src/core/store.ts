import { configureStore } from '@reduxjs/toolkit';
import notificationsReducer from '../features/contacts/domain/slices/notificationsSlice';
import contactNotesReducer from '../features/contacts/domain/slices/contactNotesSlice';

export const store = configureStore({
  reducer: {
    notifications: notificationsReducer,
    contactNotes: contactNotesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
