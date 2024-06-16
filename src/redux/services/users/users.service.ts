import {
  IUser,
  IUserCUResponse,
  IUserRequest,
  IUserResponse,
} from "@/interfaces/user.interface";
import { createApiWithAuth } from "../apiWithAuth.service";

const createUserWithAuth = createApiWithAuth("userApi", ["Users"]);

export const usersApi = createUserWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], string>({
      query: (keyword) => ({
        url: `/users?keyword=${keyword}`,
      }),
      transformResponse: (response: IUserResponse) => {
        return response.data.users;
      },
      providesTags: ["Users"],
    }),
    createUser: builder.mutation<IUserCUResponse, IUserRequest>({
      query: (body) => ({
        url: `/users`,
        method: "POST",
        body: {
          email: body.get("email"),
          name: body.get("name"),
          password: body.get("password"),
        },
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation<{ id: number }, IUserRequest>({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useDeleteUserMutation,
} = usersApi;
