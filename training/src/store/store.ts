import { configureStore} from '@reduxjs/toolkit'
import personSlice from './slices/personSlice';
import { api } from './api/api';
import dateSlice from './slices/dateSlice';
import stepsSlice from './slices/stepsSlice';

export const store = configureStore({
  reducer: {
    personSlice,
    dateSlice,
    [api.reducerPath]: api.reducer,
    stepsSlice
  },
  middleware: (getDefaultMiddleware) =>  getDefaultMiddleware().concat(api.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;