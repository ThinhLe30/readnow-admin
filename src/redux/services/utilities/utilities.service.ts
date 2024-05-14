import { createApiWithAuth } from "../apiWithAuth.service"
import {
    ICreateUtilityRequest,
    IUpdateUtilityRequest,
    IUtiltity,
    IUtiltityCUResponse,
    IUtiltityResponse
} from "@/interfaces/utility.interface"

const createUtilityWithAuth = createApiWithAuth("utilityApi", ["Utilities"])

export const utilityApi = createUtilityWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getUtilities: builder.query<IUtiltity[], string>({
            query: (keyword) => ({
                url: `/utilities?keyword=${keyword}`
            }),
            transformResponse: (response: IUtiltityResponse) => {
                const utilities = response.data.utilities
                const uniqueNames = new Set<string>()
                const uniqueUtilities: IUtiltity[] = []

                for (const item of utilities) {
                    if (!uniqueNames.has(item.name)) {
                        uniqueNames.add(item.name)
                        uniqueUtilities.push(item)
                    }
                }

                return uniqueUtilities
            },
            providesTags: ["Utilities"]
        }),
        createUtility: builder.mutation<IUtiltityCUResponse, ICreateUtilityRequest>({
            query: (body) => ({
                url: `/utilities`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Utilities"]
        }),
        updateUtility: builder.mutation<IUtiltityCUResponse, IUpdateUtilityRequest>({
            query: ({ id, body }) => ({
                url: `/utilities/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Utilities"]
        }),
        deleteUtility: builder.mutation<{ id: number }, ICreateUtilityRequest>({
            query: (id) => ({
                url: `/utilities/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Utilities"]
        })
    })
})

export const { useGetUtilitiesQuery, useCreateUtilityMutation, useUpdateUtilityMutation, useDeleteUtilityMutation } =
    utilityApi
