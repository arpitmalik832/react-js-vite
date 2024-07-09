import { createSlice } from '@reduxjs/toolkit';

import { THEME } from '../../configs/app';

export const appSlice = createSlice({
  name: 'app',
  initialState: {
    theme: THEME.LIGHT,
  },
  reducers: {
    updateStore: (state, action) => ({
      ...state,
      [action.payload.key]: action.payload.value,
    }),
    setDarkTheme: state => ({
      ...state,
      theme: THEME.DARK,
    }),
    setLightTheme: state => ({
      ...state,
      theme: THEME.LIGHT,
    }),
  },
});

export const { updateStore, setDarkTheme, setLightTheme } = appSlice.actions;

export default appSlice.reducer;
