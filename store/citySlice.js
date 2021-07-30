/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const citiesSlice = createSlice({
  name: 'city',
  initialState: {
    recentSearched: [],
  },
  reducers: {
    addCity(state, action) {
      const newCity = action.payload;
      state.recentSearched.unshift(newCity);
      if (state.recentSearched.length > 3) {
        state.recentSearched.pop();
      }
    },
  },
});

export const citiesSliceActions = citiesSlice.actions;
export default citiesSlice;
