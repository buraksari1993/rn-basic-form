import {configureStore} from '@reduxjs/toolkit';

import usersReducer from './screens/Users/usersSlices';

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
