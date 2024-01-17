import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUsers } from '../store/usersSlice';
import { UsersSocket } from '../services/usersSocket';
import { ChatsSocket } from '../services/chatsSocket';
import { addChats } from '../store/chatsSlice';
import { useToggleUserStatus } from '../hooks/useToggleUserStatus';

export const SessionStorageSocket = ({ children }) => {
  const dispatch = useDispatch();

  useToggleUserStatus();

  useEffect(() => {
    window.dispatchEvent(new Event('storage'));
    const usersSocket = new UsersSocket();
    const chatsSocket = new ChatsSocket();

    usersSocket.onMessage((users) => {
      dispatch(setUsers(users));
    });

    chatsSocket.onMessage((chats) => {
      dispatch(addChats(chats));
    });

    return () => {
      usersSocket.close();
      chatsSocket.close();
    };
  }, [dispatch]);

  return children;
};
