import { useGetStatisticOverviewQuery } from "@/redux/services/statistics/statistics.service"
import { Spin } from "antd"
import { LuClipboardSignature } from "react-icons/lu"
import { MdOutlineBedroomParent, MdOutlineHomeWork, MdOutlineStarBorderPurple500 } from "react-icons/md"

const Overview = () => {
    const { data, isLoading } = useGetStatisticOverviewQuery()

    const overview = data?.data
    if (!overview) return null

    return (
        <div className="flex-1">
            <h1 className="font-medium">Overview</h1>
            <Spin spinning={isLoading}>
                <div className="flex w-full flex-wrap justify-between gap-4 rounded-md p-3 shadow-md">
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <MdOutlineHomeWork className="h-5 w-5 text-gray-500" />
                        </span>
                        <div className="flex flex-col text-sm text-gray-400">
                            Total blocks<span className="text-base font-medium text-black"> {overview.roomblocks}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <LuClipboardSignature className="h-5 w-5 text-gray-500" />
                        </span>
                        <div className="flex flex-col text-sm text-gray-400">
                            Total rentals<span className="text-base font-medium text-black"> {overview.rentals}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <MdOutlineBedroomParent className="h-5 w-5 text-gray-500" />
                        </span>
                        <div className="flex flex-col text-sm text-gray-400">
                            Total rooms<span className="text-base font-medium text-black"> {overview.rooms}</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-md bg-gray-100">
                            <MdOutlineStarBorderPurple500 className="h-5 w-5 text-gray-500" />
                        </span>
                        <div className="flex flex-col text-sm text-gray-400">
                            Total ratings<span className="text-base font-medium text-black"> {overview.ratings}</span>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default Overview
