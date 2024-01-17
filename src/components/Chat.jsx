import { ChatHeader } from './ChatHeader';
import { Message } from './Message';
import { ChatInput } from './ChatInput';
import { useSelector } from 'react-redux';
import { useCurrentUser } from '../hooks/useCurrentUser';
import { ChatsSocket } from '../services/chatsSocket';
import { useCallback, useEffect, useMemo, useRef } from 'react';

export const Chat = ({ user }) => {
  const chatRef = useRef();
  const { currentUser } = useCurrentUser();
  const chatsSocket = useMemo(() => new ChatsSocket(), []);

  const chats = useSelector((state) => state.chats);
  const currentChat = useMemo(
    () =>
      chats.find((chat) => chat.id === currentUser.id + user.id) || {
        id: user.id + currentUser.id,
        messages: [],
      },
    [chats, currentUser, user]
  );

  const scrollToNewMessages = useCallback(
    () => setTimeout(() => chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: 'smooth' })),
    []
  );

  useEffect(() => {
    const hasUnReadMessage = currentChat.messages.some(
      (messageItem) => !messageItem.isRead && currentUser.id !== messageItem.senderId
    );
    if (!hasUnReadMessage) {
      return;
    }

    chatsSocket.send({
      ...currentChat,
      messages: currentChat.messages.map((messageItem) => ({ ...messageItem, isRead: true })),
    });

    scrollToNewMessages();
  }, [currentChat, chatsSocket, currentUser, scrollToNewMessages]);

  const onSend = (data) => {
    const message = {
      created_at: new Date().getTime(),
      senderId: currentUser.id,
      text: data.message,
      isRead: false,
    };

    const updatedCurrentChat = { ...currentChat, messages: [...currentChat.messages, message] };
    chatsSocket.send(updatedCurrentChat);
    scrollToNewMessages();
  };

  return (
    <main className="flex-1 flex flex-col max-h-[100dvh]">
      <ChatHeader user={user} />
      <section ref={chatRef} className="flex-1 dark:bg-indigo-700/30 bg-blue-400/50 overflow-auto">
        <ul className="min-h-full flex flex-col max-w-2xl mx-auto p-4">
          {currentChat.messages.map((message) => (
            <Message key={message.created_at} message={message} isExternalUser={message.senderId !== currentUser.id} />
          ))}
        </ul>
      </section>
      <ChatInput onSend={onSend} />
    </main>
  );
};
