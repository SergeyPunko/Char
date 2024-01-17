import { useEffect, useState } from 'react';
import { STORAGE_KEYS } from '../services/events';

export const useCurrentUser = () => {
  const [currentUser, setUser] = useState(JSON.parse(sessionStorage.getItem(STORAGE_KEYS.USER)));

  useEffect(() => {
    const setNewUser = () => {
      const userJson = sessionStorage.getItem(STORAGE_KEYS.USER);
      setUser(JSON.parse(userJson));
    };

    window.addEventListener('storage', setNewUser);
    return () => {
      window.removeEventListener('storage', setNewUser);
    };
  }, []);

  return { currentUser };
};
