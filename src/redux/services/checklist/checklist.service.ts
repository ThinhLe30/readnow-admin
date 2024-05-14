import { IChecklistCreateResponse, IChecklistRequest } from "@/interfaces/checklist.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"

const createApiGetCheckListWithAuth = createApiWithAuth("getChecklistApi", ["Checklists"])

export const getChecklistApi = createApiGetCheckListWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getChecklist: builder.query<{ message: string; status: number; data?: IRoomFinding[] }, void>({
            query: () => {
                return {
                    url: "/checklist"
                }
            },
            providesTags: ["Checklists"]
        }),
        createChecklist: builder.mutation<IChecklistCreateResponse, { data: IChecklistRequest }>({
            query: ({ data }) => ({
                url: `/checklist`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["findingRoom", "Checklists"]
        })
    })
})

export const { useGetChecklistQuery, useCreateChecklistMutation } = getChecklistApi
