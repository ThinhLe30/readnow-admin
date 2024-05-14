import { useGetStatisticRatingQuery } from "@/redux/services/statistics/statistics.service"
import { formatPrice } from "@/utils/helpers"
import { HomeOutlined, StarFilled } from "@ant-design/icons"
import { Spin, Tabs, TabsProps } from "antd"
import { useState } from "react"
import "./index.css"

const RoomRank = () => {
    const [tab, setTab] = useState("1")

    const onChange = (key: string) => {
        setTab(key)
    }

    const items: TabsProps["items"] = [
        {
            key: "1",
            label: "Highest Rating"
        },
        {
            key: "2",
            label: "Lowest Rating"
        }
    ]

    const { data, isLoading } = useGetStatisticRatingQuery()

    const highestRoom = data?.data.good
    const lowestRoom = data?.data.bad
    const currentRoom = tab === "1" ? highestRoom : lowestRoom

    return (
        <div className="h-full w-96">
            <h1 className="font-medium">Room ranking</h1>
            <div className="mt-2 w-full rounded-md px-4 pb-2 shadow-md">
                <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
                <Spin spinning={isLoading}>
                    {currentRoom?.map((room) => (
                        <div key={room.id} className="mb-4 flex items-center gap-3">
                            <div className="flex aspect-square h-9 w-auto items-center justify-center rounded-md bg-gray-100">
                                <HomeOutlined />
                            </div>
                            <div className="flex w-full justify-between">
                                <div className="flex flex-col items-start gap-1">
                                    <p className="text-sm font-medium">{room.roomName}</p>
                                    <p className="text-xs text-gray-400">{room.address}</p>
                                </div>
                                <div className="ml-4 flex flex-col items-end gap-1">
                                    <div className="text-sm font-medium">{formatPrice(room.price)}</div>
                                    <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1 text-xs text-gray-400">
                                            <StarFilled className="h-2 w-2" />
                                            <span>{room.ratings}</span>
                                        </div>
                                        <span className="text-xs text-gray-400">{room.status}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Spin>
            </div>
        </div>
    )
}

export default RoomRank
