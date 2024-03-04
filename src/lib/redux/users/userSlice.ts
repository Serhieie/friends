"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { User } from "./User.types";

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    changeUser(state, action: PayloadAction<User[]>) {
      state.users = [...action.payload];
    },
    removeUser(state, action: PayloadAction<string>) {
      state.users = state.users.filter((users) => users._id !== action.payload);
    },
  },
});

export const { setIsLoading, changeUser, removeUser } = usersSlice.actions;

export default usersSlice.reducer;
