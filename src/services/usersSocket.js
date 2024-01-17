import { Socket } from './socket';
import { STORAGE_KEYS } from './events';

export class UsersSocket extends Socket {
  constructor() {
    super(STORAGE_KEYS.USERS);
  }

  send(user) {
    const users = JSON.parse(localStorage.getItem(this._type)) || [];
    users.push(user);
    super.send(users);
    sessionStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  }
}
