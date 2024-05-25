import {
  IArticle,
  IArticleResponse,
  ICreateArticleRequest,
  IListArticleRespone,
} from "@/interfaces/article.interface";
import { createApiWithAuth } from "../apiWithAuth.service";

const createArticleWithAuth = createApiWithAuth("articleApi", ["Articles"]);

export const articlesApi = createArticleWithAuth.injectEndpoints({
  endpoints: (builder) => ({
    getArticle: builder.query<IArticle[], string>({
      query: (keyword) => ({
        url: `/articles?keyword=${keyword}`,
      }),
      transformResponse: (response: IListArticleRespone) => {
        return response.data.articles;
      },
      providesTags: ["Articles"],
    }),
    createArticle: builder.mutation<IArticleResponse, ICreateArticleRequest>({
      query: (body) => ({
        url: `/articles`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    updateArticle: builder.mutation<
      IArticleResponse,
      { id: string; body: ICreateArticleRequest }
    >({
      query: ({ id, body }) => ({
        url: `/articles/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Articles"],
    }),
    deleteAtricle: builder.mutation<{ id: number }, ICreateArticleRequest>({
      query: (id) => ({
        url: `/articles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Articles"],
    }),
  }),
});
export const {
  useGetArticleQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteAtricleMutation,
} = articlesApi;
