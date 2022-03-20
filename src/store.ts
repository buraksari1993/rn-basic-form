import {configureStore} from '@reduxjs/toolkit';
import ratingSlices from './screens/Rating/ratingSlices';
import usersReducer from './screens/Users/usersSlices';

export const store = configureStore({
  reducer: {
    users: usersReducer,
    rating: ratingSlices,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
