import { IRoom } from "@/interfaces/room.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createRoomWithAuth = createApiWithAuth("roomApi", ["Rooms"])

export const roomApi = createRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomsInBlocks: builder.query<
            { status: string; message: string; data?: { roomBlocks: IRoom[] } },
            { role: string; id: string; keyword: string }
        >({
            query({ role, id, keyword }) {
                return `/${role}/room-blocks/${id}/rooms?keyword=${keyword}`
            },
            providesTags: ["Rooms"]
        }),
        createRooms: builder.mutation<
            { status: string; message: string },
            { role: string; body: { roomBlockId: number; rooms: IRoom[] } }
        >({
            query: ({ role, body }) => ({
                url: `/${role}/rooms`,
                method: "POST",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        deleteRoom: builder.mutation<{ status: string; message: string }, { role: string; id: string }>({
            query: ({ role, id }) => ({
                url: `/${role}/rooms/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Rooms"]
        }),

        UpdateRoom: builder.mutation<
            { status: string; message: string; statusCode?: number },
            { role: string; body: IRoom; id: string }
        >({
            query: ({ role, id, body }) => ({
                url: `/${role}/rooms/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Rooms"]
        }),
        UpdateImages: builder.mutation<
            { status: string; message: string; data?: string[]; statusCode?: number },
            { id: string; body: FormData }
        >({
            query: ({ body, id }) => ({
                url: `/aws/upload?id=${id}`,
                method: "POST",
                body
            })
        })
    })
})

export const {
    useCreateRoomsMutation,
    useDeleteRoomMutation,
    useGetRoomsInBlocksQuery,
    useUpdateImagesMutation,
    useUpdateRoomMutation
} = roomApi
