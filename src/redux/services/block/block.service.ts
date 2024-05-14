import {
    IRoomBlockRequest,
    IRoomBlock,
    IRoomBlocksRespone,
    IRoomBlockQuery,
    IRoomBlockRespone
} from "@/interfaces/block.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiRoomBlockWithAuth = createApiWithAuth("roomBlockApi", ["Blocks"])
export const roomBlockApi = createApiRoomBlockWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomBlocks: builder.query<IRoomBlocksRespone, IRoomBlockQuery>({
            query: ({ role, keyword = "" }) => `/${role}/room-blocks?keyword=${keyword}`,
            providesTags: ["Blocks"]
        }),
        getRoomBlock: builder.query<IRoomBlockRespone, { role: string; id: string | number }>({
            query: ({ role, id }) => `/${role}/room-blocks/${id}`
        }),
        createRoomBlock: builder.mutation<IRoomBlocksRespone, { role: string; data: IRoomBlockRequest }>({
            query: ({ role, data }) => ({
                url: `/${role}/room-blocks`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Blocks"]
        }),
        updateRoomBlock: builder.mutation<
            IRoomBlockRequest,
            { role: string; id: string | number; data: IRoomBlockRequest }
        >({
            query: ({ role, id, data }) => ({
                url: `/${role}/room-blocks/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Blocks"]
        }),
        deleteRoomBlock: builder.mutation<void, { role: string; id: Pick<IRoomBlock, "id"> }>({
            query: ({ role, id }) => ({
                url: `/${role}/room-blocks/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Blocks"]
        })
    })
})

export const {
    useGetRoomBlocksQuery,
    useGetRoomBlockQuery,
    useCreateRoomBlockMutation,
    useUpdateRoomBlockMutation,
    useDeleteRoomBlockMutation
} = roomBlockApi
