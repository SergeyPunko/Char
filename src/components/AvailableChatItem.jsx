import { UserAvatar } from './UserAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChat } from '../store/currentChatSlice';
import { useCurrentUser } from '../hooks/useCurrentUser';
import dayjs from 'dayjs';
import classNames from 'classnames';
import { useMemo } from 'react';

export const AvailableChatItem = ({ user }) => {
  const { currentUser } = useCurrentUser();
  const dispatch = useDispatch();
  const chats = useSelector((state) => state.chats);

  const currentChat = useMemo(
    () => (chats || []).find((chat) => chat.id === currentUser.id + user.id),
    [chats, currentUser, user]
  );

  const lastMessage = [...(currentChat?.messages || [])].pop();
  const unreadMessages = currentChat?.messages.filter(
    (message) => !message.isRead && message.senderId !== currentUser.id
  ).length;

  return (
    <li className="flex p-2 rounded-md relative" onClick={() => dispatch(setCurrentChat(user))}>
      <span
        className={classNames(
          'block absolute bg-green-500 h-1 w-1 rounded-full -left-1 top-1/2 -translate-y-1/2',
          {
            'bg-green-500': user.isActive,
          },
          {
            'bg-red-500': !user.isActive,
          }
        )}
      ></span>
      <UserAvatar user={user} />
      <div className="flex-1 flex flex-col pl-2 overflow-hidden">
        <p className="text-ellipsis overflow-hidden whitespace-nowrap">{user.username}</p>
        <p className="text-secondary-text-color text-ellipsis overflow-hidden whitespace-nowrap mt-1">
          {lastMessage?.text ?? '...'}
        </p>
      </div>
      {lastMessage && (
        <div className="flex flex-col">
          <span className="secondary-text-color text-xs">{dayjs(lastMessage.created_at).format('hh:mm A')}</span>
          {!!unreadMessages && (
            <span className="h-5 text-center min-w-5 bg-primary-color rounded-[0.625rem] px-2 flex-grow-0 text-sm !leading-5 self-center">
              {unreadMessages}
            </span>
          )}
        </div>
      )}
    </li>
  );
};
