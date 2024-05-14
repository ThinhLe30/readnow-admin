import { IPaymentRequest, IPaymentResponse, IPaymentsResponse } from "@/interfaces/payments.interface"
import { createApiWithAuth } from "../apiWithAuth.service"
import { convertDate } from "@/utils/helpers"

const createApiPaymentskWithAuth = createApiWithAuth("paymentsApi", ["Payments"])
export const paymentsApi = createApiPaymentskWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<IPaymentsResponse, { keyword?: string }>({
            query: ({ keyword = "" }) => `/payments?keyword=${keyword}`,
            providesTags: ["Payments"],
            transformResponse(baseQueryReturnValue: IPaymentsResponse) {
                return {
                    data: baseQueryReturnValue.data.map((payment) => ({
                        ...payment,
                        paidAt: convertDate(payment.paidAt),
                        expirationDate: convertDate(payment.expirationDate)
                    })),
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        getMyPayments: builder.query<IPaymentsResponse, void>({
            query: () => `/payments/my-payment`,
            providesTags: ["Payments"],
            transformResponse(baseQueryReturnValue: IPaymentsResponse) {
                return {
                    data: baseQueryReturnValue.data.map((payment) => ({
                        ...payment,
                        paidAt: convertDate(payment.paidAt),
                        expirationDate: convertDate(payment.expirationDate)
                    })),
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        getMyPayment: builder.query<IPaymentResponse, { id: number }>({
            query: ({ id }) => `/payments/${id}`,
            providesTags: ["Payments"],
            transformResponse(baseQueryReturnValue: IPaymentResponse) {
                return {
                    data: {
                        ...baseQueryReturnValue.data,
                        paidAt: convertDate(baseQueryReturnValue.data.paidAt),
                        expirationDate: convertDate(baseQueryReturnValue.data.expirationDate)
                    },
                    message: baseQueryReturnValue.message,
                    status: baseQueryReturnValue.status
                }
            }
        }),
        checkoutPayment: builder.mutation<IPaymentResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/stripe/check-out/${id}`,
                method: "POST"
            }),
            invalidatesTags: ["Payments"]
        }),
        createPayment: builder.mutation<IPaymentResponse, IPaymentRequest>({
            query: (body) => ({
                url: `/payments`,
                method: "POST",
                body
            })
        }),
        updatePayment: builder.mutation<IPaymentResponse, { id: number; body: IPaymentRequest }>({
            query: ({ id, body }) => ({
                url: `/payments/${id}`,
                method: "PUT",
                body
            }),
            invalidatesTags: ["Payments"]
        }),
        deletePayment: builder.mutation<IPaymentResponse, { id: number }>({
            query: ({ id }) => ({
                url: `/payments/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: ["Payments"]
        })
    })
})

export const {
    useGetPaymentsQuery,
    useGetMyPaymentsQuery,
    useGetMyPaymentQuery,
    useCheckoutPaymentMutation,
    useCreatePaymentMutation,
    useUpdatePaymentMutation,
    useDeletePaymentMutation
} = paymentsApi
