import { useDispatch } from 'react-redux';
import { exitChat } from '../store/currentChatSlice';
import { UserAvatar } from './UserAvatar';

export const ChatHeader = ({ user }) => {
  const dispatch = useDispatch();

  return (
    <header className="w-full border-b-border-color p-4 flex items-center gap-4">
      <button onClick={() => dispatch(exitChat())} className="p-2 rounded-md cursor-pointer md:hidden">
        <svg width="24" height="24" viewBox="0 0 24 24" id="back-arrow" className=" fill-main-text">
          <path fill="none" d="M0 0h24v24H0V0z"></path>
          <path d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42-.39-.39-1.02-.39-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"></path>
        </svg>
      </button>
      <div className="flex items-center gap-4 group relative">
        <UserAvatar user={user} />
        <p>{user.username}</p>

        <div className="hidden md:block invisible group-hover:visible absolute group-hover:delay-500 transition-all duration-200 opacity-0 group-hover:opacity-100 bg-tooltip-color bottom-0 p-2 rounded-md translate-y-full text-sm overflow-hidden">
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">Username: {user.username}</p>
          <p className="text-ellipsis overflow-hidden whitespace-nowrap">Id: {user.id}</p>
        </div>
      </div>
    </header>
  );
};
