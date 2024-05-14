import useAuth from "@/hooks/useAuth"
import { useGetRoomBlocksQuery } from "@/redux/services/block/block.service"
import { useGetStatisticRoomQuery } from "@/redux/services/statistics/statistics.service"
import { Select, Spin } from "antd"
import { Chart as ChartJS, ArcElement, Legend, Tooltip } from "chart.js"
import { useEffect, useState } from "react"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

const Rooms = () => {
    const { role } = useAuth()

    const { data: dataBlocks } = useGetRoomBlocksQuery({ role: role! })
    const blocks = dataBlocks?.data.roomBlocks

    const initialId = blocks?.[0]?.id

    const [id, setId] = useState(initialId)

    useEffect(() => {
        if (initialId) {
            setId(initialId)
        }
    }, [initialId])

    const { data, isLoading } = useGetStatisticRoomQuery({ id: Number(id) }, { skip: !id })
    const empty = data?.data.empty || 0
    const occupied = data?.data.occupied || 0
    const total = empty + occupied || 0

    const dataRoom = {
        labels: ["Empty", "Occupied"],
        datasets: [
            {
                data: [empty, occupied],
                backgroundColor: ["#e3631466", "#E7894E"],
                borderWidth: 1
            }
        ]
    }

    const option = {
        plugins: {
            legend: {
                display: false
            }
        },
        cutout: "70%",
        responsive: true,
        borderRadius: 10
    }

    const handleBlockChange = (value: any) => {
        setId(value)
    }

    return (
        <div className="w-72">
            <h1 className="font-medium">Rooms report</h1>
            <Spin spinning={isLoading}>
                <div className="flex flex-col rounded-md px-6 pb-3 pt-2 shadow-md">
                    <Select
                        defaultValue={blocks?.[0]?.id}
                        className="!w-full"
                        placeholder="Select a block"
                        onChange={handleBlockChange}
                    >
                        {blocks?.map((block) => (
                            <Select.Option key={block.id} value={block.id}>
                                {block.address}
                            </Select.Option>
                        ))}
                    </Select>
                    <div className="flex items-center gap-6">
                        <div className="relative mt-4 w-24">
                            <Doughnut data={dataRoom} options={option} />
                            <span className="absolute left-1/2 top-1/2 -z-50 -translate-x-1/2 -translate-y-1/2 text-2xl">
                                <span className="text-secondary">{occupied}/</span>
                                <span className=" text-primary">{total}</span>
                            </span>
                        </div>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary/40"></div>
                                <span className="text-xs text-gray-400">Empty - {empty}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-primary"></div>
                                <span className="text-xs text-gray-400">Occupied - {occupied}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-secondary"></div>
                                <span className="text-xs text-gray-400">Total - {total}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Spin>
        </div>
    )
}

export default Rooms
