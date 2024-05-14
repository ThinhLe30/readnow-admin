import {
    IModInfoResponse,
    IMyRentalResponse,
    IRentals,
    IRentalsResponse,
    IReviewRentalRequest
} from "@/interfaces/rentals.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { convertDate } from "@/utils/helpers"

const createApiRentalskWithAuth = createApiWithAuth("rentalsApi", ["Rentals"])
export const rentalsApi = createApiRentalskWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getRentals: builder.query<IRentalsResponse, { keyword: string }>({
            query: ({ keyword = "" }) => `/rental?keyword=${keyword}`,
            providesTags: ["Rentals"],
            transformResponse(baseQueryReturnValue: IRentalsResponse) {
                return {
                    data: baseQueryReturnValue.data.map((rental: IRentals) => ({
                        ...rental,
                        rentalInfo: {
                            ...rental.rentalInfo,
                            moveInDate: convertDate(rental.rentalInfo.moveInDate),
                            moveOutDate: convertDate(rental.rentalInfo.moveOutDate)
                        },
                        renterInfo: {
                            ...rental.renterInfo,
                            birthday: convertDate(rental.renterInfo.birthday),
                            identityDateOfIssue: convertDate(rental.renterInfo.identityDateOfIssue)
                        }
                    })),
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        getRental: builder.query<IRentalsResponse, { id: number }>({
            query: ({ id }) => `/rental/${id}`
        }),
        getMyRentals: builder.query<IRentalsResponse, void>({
            query: () => `/rental/my-rental`,
            transformResponse(baseQueryReturnValue: IRentalsResponse) {
                return {
                    data: baseQueryReturnValue.data.map((rental: IRentals) => ({
                        ...rental,
                        rentalInfo: {
                            ...rental.rentalInfo,
                            moveInDate: convertDate(rental.rentalInfo.moveInDate),
                            moveOutDate: convertDate(rental.rentalInfo.moveOutDate)
                        },
                        renterInfo: {
                            ...rental.renterInfo,
                            birthday: convertDate(rental.renterInfo.birthday),
                            identityDateOfIssue: convertDate(rental.renterInfo.identityDateOfIssue)
                        }
                    })),
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            },
            providesTags: ["MyRentals"]
        }),
        getMyRental: builder.query<IMyRentalResponse, { id: number }>({
            query: ({ id }) => `/rental/my-rental/${id}`,
            transformResponse(baseQueryReturnValue: IMyRentalResponse) {
                return {
                    data: {
                        ...baseQueryReturnValue.data,
                        rentalInfo: {
                            ...baseQueryReturnValue.data.rentalInfo,
                            moveInDate: convertDate(baseQueryReturnValue.data.rentalInfo.moveInDate),
                            moveOutDate: convertDate(baseQueryReturnValue.data.rentalInfo.moveOutDate)
                        },
                        hostInfo: {
                            ...baseQueryReturnValue.data.hostInfo,
                            birthday: convertDate(baseQueryReturnValue.data.hostInfo.birthday),
                            identityDateOfIssue: convertDate(baseQueryReturnValue.data.hostInfo.identityDateOfIssue)
                        }
                    },
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            },
            providesTags: ["MyRentals"]
        }),
        getModInfo: builder.query<IModInfoResponse, void>({
            query: () => `/rental/mod-info`,
            transformResponse(baseQueryReturnValue: IModInfoResponse) {
                return {
                    data: {
                        ...baseQueryReturnValue.data,
                        birthday: convertDate(baseQueryReturnValue.data.birthday),
                        identityDateOfIssue: convertDate(baseQueryReturnValue.data.identityDateOfIssue)
                    },
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        updateRental: builder.mutation<IRentalsResponse, { id: number; data: any }>({
            query: ({ id, data }) => ({
                url: `/rental/${id}`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: ["Rentals"]
        }),
        approveRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/${id}/approve`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals"]
        }),
        cancleRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/${id}/cancel`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals"]
        }),
        acceptBreakRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/${id}/accept-break`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals"]
        }),
        endRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/${id}/end`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals"]
        }),
        confirmRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/my-rental/${id}/confirm`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals", "MyRentals"]
        }),
        requestBreakRental: builder.mutation<IRentalsResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/rental/my-rental/${id}/request-break`,
                method: "PUT"
            }),
            invalidatesTags: ["Rentals", "MyRentals"]
        }),
        reviewRental: builder.mutation<IRentalsResponse, IReviewRentalRequest>({
            query: (data) => ({
                url: `/rating`,
                method: "POST",
                body: data
            }),
            invalidatesTags: ["Rentals", "MyRentals"]
        })
    })
})

export const {
    useGetRentalsQuery,
    useGetRentalQuery,
    useGetMyRentalQuery,
    useGetMyRentalsQuery,
    useGetModInfoQuery,
    useUpdateRentalMutation,
    useApproveRentalMutation,
    useCancleRentalMutation,
    useAcceptBreakRentalMutation,
    useEndRentalMutation,
    useConfirmRentalMutation,
    useRequestBreakRentalMutation,
    useReviewRentalMutation
} = rentalsApi
