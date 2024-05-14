import { IRental, IRentalResponse } from "@/interfaces/rental.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const createApiRentalWithAuth = createApiWithAuth("rental", ["rental"])

export const rentalApi = createApiRentalWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        createRental: builder.mutation<IRentalResponse, { data: IRental }>({
            query: ({ data }) => ({
                url: `/rental`,
                method: "POST",
                body: data
            })
        })
    })
})

export const { useCreateRentalMutation } = rentalApi
