import { createSlice } from '@reduxjs/toolkit';

const chatsSlice = createSlice({
  name: 'todos',
  initialState: [],
  reducers: {
    addChats: (state, action) => action.payload,
  },
});

export const { addChats } = chatsSlice.actions;
export default chatsSlice.reducer;
