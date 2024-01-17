import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useSelector } from 'react-redux';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ChatsSocket } from '../services/chatsSocket';

export const Chat = ({ user }) => {
  const { currentUser } = useCurrentUser();
  const chatsSocket = new ChatsSocket();

  const chats = useSelector((state) => state.chats) || [];
  const currentChat = chats.find((chat) => chat.id === currentUser.id + user.id) || {
    id: user.id + currentUser.id,
    messages: [],
  };

  const onSend = (data) => {
    const message = {
      created_at: new Date().getTime(),
      senderId: currentUser.id,
      text: data.message,
    };

    const updatedCurrentChat = { ...currentChat, messages: [...currentChat.messages, message] };
    chatsSocket.send(updatedCurrentChat);
  };

  return (
    <main className="flex-1 flex flex-col">
      <ChatHeader user={user} />
      <section className="flex-1 bg-gradient-to-tr from-indigo-950/60  to-black">
        <ul className="h-full flex flex-col overflow-auto max-w-2xl mx-auto p-4">
          {currentChat.messages.map((message) => (
            <Message key={message.created_at} message={message} isExternalUser={message.senderId !== currentUser.id} />
          ))}
        </ul>
      </section>
      <ChatInput onSend={onSend} />
    </main>
  );
};
