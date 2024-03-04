"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import axios, { AxiosError } from "axios";
import { Message } from "./initialState";

export const messagesApi = createApi({
  reducerPath: "messagesApi",
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
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getAllMessages: builder.query<Message[], void>({
      query: () => ({ url: "messages" }),
      providesTags: ["Messages"],
    }),
  }),
});

export const { useGetAllMessagesQuery } = messagesApi;
