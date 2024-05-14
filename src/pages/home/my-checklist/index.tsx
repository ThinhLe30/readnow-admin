import { useState } from "react"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { Empty } from "antd"
import { useGetChecklistQuery } from "@/redux/services/checklist/checklist.service"
import RoomList from "../room-list"
import MapView from "../map-view"

const MyChecklist = () => {
    const [isShowMap, setIsShowMap] = useState(false)

    const { data, isLoading, isFetching } = useGetChecklistQuery(undefined, { refetchOnMountOrArgChange: true })

    if (data?.data?.length === 0 && !isLoading && !isFetching)
        return (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rooms in your checklist." className="mt-24" />
        )

    return (
        <div className="mb-8 mt-4">
            <h1 className="px-4 text-2xl font-bold  text-secondary sm:px-6 md:px-10 xl:px-28">My Checklist</h1>
            {isShowMap ? (
                <MapView rooms={data?.data} />
            ) : (
                <RoomList rooms={data?.data} isLoading={isLoading} isFetching={isFetching} />
            )}

            <button
                onClick={() => {
                    setIsShowMap((state) => !state)
                }}
                className="fixed bottom-8 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
            >
                {!isShowMap ? "Show map" : "Show list"}{" "}
                <span>{!isShowMap ? <BsMapFill /> : <AiOutlineUnorderedList />}</span>
            </button>
        </div>
    )
}

export default MyChecklist
