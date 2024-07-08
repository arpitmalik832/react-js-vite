import { createSlice } from '@reduxjs/toolkit';

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState: {
    stack: [],
  },
  reducers: {
    pushStack: (state, action) => {
      state.stack.push(action.payload);
      return state;
    },
    popStack: state => {
      state.stack.pop()();
      return state;
    },
    clearStack: state => ({
      ...state,
      stack: [],
    }),
  },
});

export const { pushStack, popStack, clearStack } = navigationSlice.actions;

export default navigationSlice.reducer;
