import { Navigate, Outlet } from "react-router-dom"
import { ROLE } from "@/utils/constants/GlobalConst"
import useAuth from "@/hooks/useAuth"

export const RequireAuthAdmin = () => {
    const { role } = useAuth()

    switch (role) {
        case ROLE.ADMIN:
            return <Outlet />
        default:
            return <Navigate to="/" />
    }
}

export const RequireAuthMod = () => {
    const { role } = useAuth()

    switch (role) {
        case ROLE.MOD:
            return <Outlet />
        default:
            return <Navigate to="/" />
    }
}

export const RequireAuth = () => {
    const { userInfo } = useAuth()

    if (userInfo) {
        return <Outlet />
    } else {
        return <Navigate to="/" />
    }
}
