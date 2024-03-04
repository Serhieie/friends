import { UserData } from "../auth/redux-auth.type";

export interface Message {
  _id?: string;
  message: string;
  sender: string;
  senderInfo?: UserData;
  createdAt?: string;
  updatedAt?: string;
}

export interface MessageStateProps {
  messages: Message[];
}

export const initialState: MessageStateProps = {
  messages: [],
};
