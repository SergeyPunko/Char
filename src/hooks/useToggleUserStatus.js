import { useEffect } from 'react';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { STORAGE_KEYS } from '../services/events';
import { useSelector } from 'react-redux';

export const useToggleUserStatus = () => {
  const users = useSelector((state) => state.users);
  const { currentUser } = useCurrentUser();

  const updateUser = (user, allUsers = []) => {
    if (user) {
      const newUsers = allUsers.map((userItem) => (userItem.id === user.id ? user : userItem));
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(newUsers));
    }
  };

  useEffect(() => {
    const setStatusInActive = () =>
      currentUser && Object.keys(currentUser).length && updateUser({ ...currentUser, isActive: false }, users);
    const setStatusActive = () =>
      currentUser && Object.keys(currentUser).length && updateUser({ ...currentUser, isActive: true }, users);

    window.addEventListener('beforeunload', setStatusInActive);
    window.addEventListener('load', setStatusActive);

    return () => {
      window.removeEventListener('beforeunload', setStatusInActive);
      window.removeEventListener('load', setStatusActive);
    };
  }, [currentUser, users]);
};
