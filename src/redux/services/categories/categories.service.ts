import { createApiWithAuth } from "../apiWithAuth.service";
import {
  ICreateCategoryRequest,
  ICategory,
  ICategoryCUResponse,
  ICategoryResponse,
  IUpdateCategoryRequest,
} from "@/interfaces/category.interface";

const createCategoryWithAuth = createApiWithAuth("categoryApi", ["Categories"]);

export const categoriesApi = createCategoryWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ICategory[], string>({
      query: (keyword) => ({
        url: `/categories?keyword=${keyword}`,
      }),
      transformResponse: (response: ICategoryResponse) => {
        const categories = response.data.categories;
        return categories;
      },
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<
      ICategoryCUResponse,
      ICreateCategoryRequest
    >({
      query: (body) => ({
        url: `/categories`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<
      ICategoryCUResponse,
      IUpdateCategoryRequest
    >({
      query: ({ name, id }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: {
          name: name,
        },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<{ id: number }, ICreateCategoryRequest>({
      query: (id) => ({
        url: `/categories/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
