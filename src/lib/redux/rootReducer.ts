import { combineReducers } from "redux";
import { authSlice, persistedAuthReducer } from "./auth/slice-auth";
import { contactsApi } from "./contacts/contactsApi";
import { usersApi } from "./users/userApi";
import { messagesApi } from "./message/messagesApi";

const persistedRootReducer = combineReducers({
  auth: persistedAuthReducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

const rootReducer = combineReducers({
  auth: authSlice.reducer,
  [contactsApi.reducerPath]: contactsApi.reducer,
  [usersApi.reducerPath]: usersApi.reducer,
  [messagesApi.reducerPath]: messagesApi.reducer,
});

export { rootReducer, persistedRootReducer };
