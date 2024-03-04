"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { Contact } from "./Contacts.types";
import axios, { AxiosError } from "axios";

export interface GetAllContactsResponse {
  result: Array<Contact>;
}

interface GetContactInterface {
  id: string;
}

export interface UpdateContactInterface {
  users: Contact | undefined;
  dataId: string | undefined;
}
export interface UpdateAllContactsInterface {
  users: Contact[];
}
export const contactsApi = createApi({
  reducerPath: "contactsApi",
  baseQuery: async ({ url, method, body }, { signal }) => {
    try {
      await axios.defaults.headers.common.Authorization;

      const result = await axios.request({
        url,
        method,
        data: body,
        signal,
      });

      return { data: result.data };
    } catch (error) {
      const axiosError = error as AxiosError;
      return { error: axiosError.message || "Something went wrong!" };
    }
  },
  tagTypes: ["Contacts"],
  endpoints: (builder) => ({
    getAllContacts: builder.query<Contact[], void>({
      query: () => ({ url: "contacts" }),
      providesTags: ["Contacts"],
    }),
    getContact: builder.query<Contact, GetContactInterface>({
      query: ({ id }) => ({ url: `contacts/${id}` }),
      providesTags: ["Contacts"],
    }),

    addContact: builder.mutation<Contact, Contact>({
      query: (asset) => ({
        url: "contacts",
        method: "POST",
        body: asset,
      }),
      invalidatesTags: ["Contacts"],
    }),

    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Contacts"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetContactQuery,
  useAddContactMutation,
  useDeleteContactMutation,
} = contactsApi;
