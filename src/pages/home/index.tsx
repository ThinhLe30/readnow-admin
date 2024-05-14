import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { BsMapFill } from "react-icons/bs"
import { AiOutlineUnorderedList } from "react-icons/ai"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import { useGetFindingRoomsQuery } from "@/redux/services/findingRoom/findingRoom.service"
import { Empty } from "antd"
import MapView from "./map-view"
import RoomList from "./room-list"
import usePath from "@/hooks/usePath"

const Home = () => {
    const [searchParams] = useSearchParams()
    const [isShowMap, setIsShowMap] = useState(false)
    const [searchParamsObject, setSearchParamsObject] = useState<Record<string, string[]>>({})

    const [currentPage, setCurrentPage] = useState(1)

    const { data, isLoading, isFetching, isSuccess } = useGetFindingRoomsQuery(
        {
            page: currentPage,
            params: searchParamsObject
        },
        {
            refetchOnMountOrArgChange: true
        }
    )

    const [currentRooms, setCurrentRooms] = useState<IRoomFinding[]>(data?.data?.rooms || [])

    const isFull = Number(data?.data?.totalRoom) < currentRooms.length

    const handleLoadMore = () => {
        setCurrentPage((prev) => prev + 1)
    }

    useEffect(() => {
        if (isSuccess) {
            if (currentPage === 1) {
                setCurrentRooms(data?.data?.rooms || [])
            } else {
                setCurrentRooms((prevRooms) => {
                    const newRooms = data?.data?.rooms || []
                    return Array.from(new Set([...prevRooms, ...newRooms]))
                })
            }
        }
    }, [data, currentPage, isFetching, isSuccess])

    useEffect(() => {
        const params: [string, string][] = []
        for (const entry of searchParams.entries()) {
            params.push(entry as [string, string])
        }

        const newSearchParamsObject: Record<string, string[]> = {}

        params?.forEach((i) => {
            if (Object.keys(newSearchParamsObject).some((item) => item === i[0])) {
                newSearchParamsObject[i[0]] = [...newSearchParamsObject[i[0]], i[1]]
            } else {
                newSearchParamsObject[i[0]] = [i[1]]
            }
        })

        setSearchParamsObject(newSearchParamsObject)
    }, [searchParams])

    const { isIndex } = usePath()

    const isFetchingWhenBack = isFetching && currentPage === 1

    const [isShowButton, setIsShowButton] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const shouldShowButton = window.scrollY > 200 || isShowMap
            setIsShowButton(shouldShowButton)
        }

        window.addEventListener("scroll", handleScroll)

        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
    }, [isShowMap])

    if (currentRooms.length === 0 && !isIndex && !isLoading && !isFetching) {
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rooms match in list." className="mt-32" />
    }

    return (
        <div className="relative h-full w-full">
            {isShowMap ? (
                <MapView rooms={currentRooms} />
            ) : (
                <RoomList
                    rooms={currentRooms}
                    isLoading={isLoading}
                    isFetching={isFetching}
                    isFetchingWhenBack={isFetchingWhenBack}
                    isFull={isFull}
                    handleLoadMore={handleLoadMore}
                />
            )}

            {isShowButton && (
                <button
                    onClick={() => {
                        setIsShowMap((state) => !state)
                    }}
                    className="fixed bottom-8 right-1/2 z-50 flex translate-x-1/2 items-center justify-center gap-2 rounded-full bg-secondary px-4 py-3 font-semibold text-white transition hover:scale-110  "
                >
                    {isShowMap ? "Show list" : "Show map"}{" "}
                    <span>{isShowMap ? <AiOutlineUnorderedList /> : <BsMapFill />}</span>
                </button>
            )}
        </div>
    )
}

export default Home
