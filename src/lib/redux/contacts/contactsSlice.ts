"use client";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./initialState";
import { Contact } from "./Contacts.types";

export const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setIsLoading(state) {
      state.isLoading = !state.isLoading;
    },
    changeContact(state, action: PayloadAction<Contact[]>) {
      state.contacts = [...action.payload];
    },
    removeContact(state, action: PayloadAction<string>) {
      state.contacts = state.contacts.filter((contact) => contact._id !== action.payload);
    },
  },
});

export const { setIsLoading, changeContact, removeContact } = contactsSlice.actions;

export default contactsSlice.reducer;
