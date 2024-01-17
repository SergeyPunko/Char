import { createSlice } from '@reduxjs/toolkit';

const currentChatSlice = createSlice({
  name: 'todos',
  initialState: null,
  reducers: {
    setCurrentChat: (state, action) => action.payload,
    exitChat: () => null,
  },
});

export const { setCurrentChat, exitChat } = currentChatSlice.actions;
export default currentChatSlice.reducer;
