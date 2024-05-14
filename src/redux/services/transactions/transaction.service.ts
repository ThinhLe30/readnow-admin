import { ITransactions, ITransactionsResponse } from "@/interfaces/transaction.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createTransactionWithAuth = createApiWithAuth("transactionApi", ["Transactions"])

export const transactionApi = createTransactionWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getTransactions: builder.query<ITransactions[], string>({
            query: (keyword) => ({
                url: `/transactions?keyword=${keyword}`
            }),
            transformResponse: (response: ITransactionsResponse) => {
                return response.data
            },
            providesTags: ["Transactions"]
        })
    })
})

export const { useGetTransactionsQuery } = transactionApi
