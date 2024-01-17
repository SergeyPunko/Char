import { useSelector } from 'react-redux';
import { AvailableChats } from './AvailableChats';
import { Chat } from './Chat';

export const ChatDashboard = () => {
  const currentChat = useSelector((state) => state.currentChat);

  return (
    <>
      <AvailableChats />
      {currentChat && <Chat user={currentChat} />}
    </>
  );
};
