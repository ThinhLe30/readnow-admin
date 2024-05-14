import { IStatisticRatingResponse, IStatisticRevenueResponse } from "@/interfaces/statistics.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiStatistics = createApiWithAuth("statistics", ["statistics"])

export const statisticsApi = createApiStatistics.injectEndpoints({
    endpoints: (builder) => ({
        getStatisticRevenue: builder.query<IStatisticRevenueResponse, { year: number }>({
            query: ({ year }) => {
                return {
                    url: `/statistic/revenue/${year}`
                }
            }
        }),
        getStatisticUser: builder.query<any, { year: number }>({
            query: ({ year }) => {
                return {
                    url: `/statistic/users/${year}`
                }
            }
        }),
        getStatisticCost: builder.query<any, { year: number }>({
            query: ({ year }) => {
                return {
                    url: `/statistic/cost/${year}`
                }
            }
        }),
        getStatisticRating: builder.query<IStatisticRatingResponse, void>({
            query: () => {
                return {
                    url: `/statistic/ratings`
                }
            }
        }),
        getStatisticRental: builder.query<any, { year: number }>({
            query: ({ year }) => {
                return {
                    url: `/statistic/rentals/${year}`
                }
            }
        }),
        getStatisticRoom: builder.query<any, { id: number }>({
            query: ({ id }) => {
                return {
                    url: `/statistic/rooms/${id}`
                }
            }
        }),
        getStatisticOverview: builder.query<any, void>({
            query: () => {
                return {
                    url: `/statistic/overview`
                }
            }
        })
    })
})

export const {
    useGetStatisticRevenueQuery,
    useGetStatisticUserQuery,
    useGetStatisticCostQuery,
    useGetStatisticRatingQuery,
    useGetStatisticRentalQuery,
    useGetStatisticRoomQuery,
    useGetStatisticOverviewQuery
} = statisticsApi
