import { Chat } from './Chat';
import { AvailableChats } from './AvailableChats';
import { RegisterForm } from './RegisterForm';
import { useSelector } from 'react-redux';
import { useCurrentUser } from '../hooks/useCurrentUser';

export const App = () => {
  const { currentUser } = useCurrentUser();
  const currentChat = useSelector((state) => state.currentChat);

  return (
    <div className="h-full flex">
      {currentUser ? (
        <>
          <AvailableChats />
          {currentChat && <Chat user={currentChat} />}
        </>
      ) : (
        <RegisterForm />
      )}
    </div>
  );
};
