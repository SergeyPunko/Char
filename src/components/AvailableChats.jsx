import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { AvailableChatItem } from './AvailableChatItem';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const AvailableChats = () => {
  const users = useSelector((state) => state.users);
  const { currentUser } = useCurrentUser();

  const filterUsers = useCallback(
    () =>
      users
        .filter((obj, index, self) => index === self.findIndex((o) => o.id === obj.id))
        .filter((user) => user.id !== currentUser.id),
    [users, currentUser]
  );

  const availableChats = filterUsers();

  return (
    <aside className="flex-1 max-w-96 border-r border-r-border-color h-full">
      {/* form */}
      <ul className="flex flex-col p-2">
        {availableChats.map((user) => (
          <AvailableChatItem key={user.id} user={user} />
        ))}
      </ul>
    </aside>
  );
};
