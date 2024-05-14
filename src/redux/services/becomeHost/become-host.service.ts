import { IBecomeHost, IMyInfoResponse } from "@/interfaces/user.interface"
import { createApiWithAuth } from "../apiWithAuth.service"

const creatApiBecomeHostWithAuth = createApiWithAuth("becomeHostApi", ["BecomeHost"])
export const becomeHostApi = creatApiBecomeHostWithAuth.injectEndpoints({
    endpoints: (builder) => ({
        becomeHost: builder.mutation<IMyInfoResponse, IBecomeHost>({
            query: (body) => {
                return {
                    url: `/users/become-host`,
                    method: "POST",
                    body: body
                }
            },
            invalidatesTags: ["BecomeHost"]
        })
    })
})

export const { useBecomeHostMutation } = becomeHostApi
