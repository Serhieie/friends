"use client";
import { createApi } from "@reduxjs/toolkit/query/react";
import { User } from "./User.types";
import axios, { AxiosError } from "axios";

export interface GetAllUserResponse {
  result: Array<User>;
}

export interface GetUserInterface {
  id: string;
}

export interface UpdateUserInterface {
  users: User | undefined;
  dataId: string | undefined;
}
export interface UpdateAllUsersInterface {
  users: User[];
}
export const usersApi = createApi({
  reducerPath: "usersApi",
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
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getAllUsers: builder.query<User[], void>({
      query: () => ({ url: "users" }),
      providesTags: ["Users"],
    }),
    getUser: builder.query<User, GetUserInterface>({
      query: ({ id }) => ({ url: `users/${id}` }),
      providesTags: ["Users"],
    }),

    addUser: builder.mutation<User, User>({
      query: (asset) => ({
        url: "users",
        method: "POST",
        body: asset,
      }),
      invalidatesTags: ["Users"],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useGetUserQuery,
  useAddUserMutation,
  useDeleteUserMutation,
} = usersApi;
