import { Socket } from './socket';
import { STORAGE_KEYS } from './events';

export class ChatsSocket extends Socket {
  constructor() {
    super(STORAGE_KEYS.CHATS);
  }

  send(chat) {
    const chats = JSON.parse(localStorage.getItem(STORAGE_KEYS.CHATS)) || [];

    const restChats = chats.filter((chatItem) => chatItem.id !== chat.id);

    super.send([chat, ...restChats]);
  }
}
