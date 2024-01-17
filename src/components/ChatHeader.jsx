import { UserAvatar } from './UserAvatar';

export const ChatHeader = ({ user }) => {
  return (
    <header className="w-full border-b-border-color p-4">
      <div className="flex items-center gap-4">
        <UserAvatar user={user} />
        <p>name</p>
      </div>
    </header>
  );
};
