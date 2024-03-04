import { ContactsState } from "./Contacts.types";

export const getIsLoading = (state: { dashboard: ContactsState }) =>
  state.dashboard.isLoading;
