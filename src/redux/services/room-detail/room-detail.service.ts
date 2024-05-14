import { createApiWithAuth } from "../apiWithAuth.service"
import { IRoomDetailResponse } from "@/interfaces/room-detail.interface"

const createApiRoomDetailWithAuth = createApiWithAuth("roomDetail", ["roomDetail"])

export const roomDetailApi = createApiRoomDetailWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRoomDetail: builder.query<IRoomDetailResponse, { id: string | undefined }>({
            query: ({ id }) => {
                return {
                    url: `/finding/${id}`
                }
            }
        })
    })
})

export const { useGetRoomDetailQuery } = roomDetailApi
