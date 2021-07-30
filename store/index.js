import { configureStore } from '@reduxjs/toolkit';
import citiesSlice from './citySlice';

const store = configureStore({
  reducer: {
    city: citiesSlice.reducer,
  },
});

export default store;
