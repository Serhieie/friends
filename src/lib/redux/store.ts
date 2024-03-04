"use client";
import { configureStore } from "@reduxjs/toolkit";
// import { setupListeners } from "@reduxjs/toolkit/query";
import { usersApi } from "./users/userApi";
import { contactsApi } from "./contacts/contactsApi";
import { rootReducer, persistedRootReducer } from "./rootReducer";
import { messagesApi } from "./message/messagesApi";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware: any) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(usersApi.middleware, contactsApi.middleware, messagesApi.middleware),
    devTools: process.env.NODE_ENV !== "production",
  });

export const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return makeConfiguredStore();
  } else {
    let store: any = configureStore({
      reducer: persistedRootReducer,
      middleware: (getDefaultMiddleware: any) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          },
        }).concat(usersApi.middleware, contactsApi.middleware, messagesApi.middleware),
      devTools: process.env.NODE_ENV !== "production",
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

// setupListeners(store.dispatch);
// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
