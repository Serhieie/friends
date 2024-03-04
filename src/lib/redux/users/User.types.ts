export interface User {
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
  lastOnline: string;
}

export interface UsersState {
  users: User[];
  isLoading: boolean;
}
