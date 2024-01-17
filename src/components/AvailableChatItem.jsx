import { UserAvatar } from './UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../store/currentChatSlice';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const AvailableChatItem = ({ user }) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats) || [];
  const currentChat = chats.find((chat) => chat.id === currentUser.id + user.id);
  const lastMessage = [...(currentChat?.messages || [])].pop();

  return (
    <li className="flex flex-1 p-2 rounded-md" onClick={() => dispatch(setCurrentChat(user))}>
      <UserAvatar user={user} />
      <div className="flex-1 flex flex-col pl-2 overflow-hidden">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap">{user.username}</p>
        <p className="text-secondary-text-color text-ellipsis overflow-hidden whitespace-nowrap mt-1">
          {lastMessage?.text ?? '...'}
        </p>
      </div>
      <div className="flex flex-col">
        <span>time</span>
        {/* <span className="h-5 text-center min-w-5 bg-primary-color rounded-[0.625rem] px-2 flex-grow-0 text-sm !leading-5 self-center">
          0
        </span> */}
      </div>
    </li>
  );
};
