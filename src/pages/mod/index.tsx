import Slider from "@/container/Slider"
import { useGetUtilitiesQuery } from "@/redux/services/help/help.service"
import { Outlet } from "react-router-dom"

const Mod = () => {
    useGetUtilitiesQuery()
    return (
        <div className="flex h-screen overflow-y-hidden">
            <Slider />
            <div className="h-full w-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    )
}

export default Mod
