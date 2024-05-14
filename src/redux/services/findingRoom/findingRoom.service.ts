import { IRoomFindingResponse } from "@/interfaces/roomfiding.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApifindingRoomWithAuth = createApiWithAuth("findingRoomApi", ["findingRoom"])

export const findingRoomApi = createApifindingRoomWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getFindingRooms: builder.query<IRoomFindingResponse, { perPage?: number; page: number; params: any }>({
            query: ({ perPage = 20, page = 1, params }) => {
                return {
                    url: "/finding",
                    params: {
                        perPage,
                        page,
                        ...params
                    }
                }
            },
            providesTags: ["findingRoom"]
        })
    })
})

export const { useGetFindingRoomsQuery } = findingRoomApi
