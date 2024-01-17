import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './usersSlice';
import currentChatSlice from './currentChatSlice';
import chatsSlice from './chatsSlice';

export const store = configureStore({
  reducer: {
    users: usersSlice,
    currentChat: currentChatSlice,
    chats: chatsSlice,
  },
});
