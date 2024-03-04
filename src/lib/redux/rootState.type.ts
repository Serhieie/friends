import { AuthState } from "./auth/redux-auth.type";
import { UsersState } from "./users/User.types";
import { ContactsState } from "./contacts/Contacts.types";
import { Message } from "./message/initialState";

export interface RootState {
  auth: AuthState;
  contacts: ContactsState;
  messages: Message;
  users: UsersState;
}
