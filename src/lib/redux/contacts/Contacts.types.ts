export interface Contact {
  _id: string;
  name: string;
  email: string;
  password: string;
  subscription: string;
  avatarURL: string;
  verify: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  online: boolean;
}

export interface ContactsState {
  contacts: Contact[];
  isLoading: boolean;
}
