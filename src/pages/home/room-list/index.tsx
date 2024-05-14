import { Button, Skeleton } from "antd"
import { IRoomFinding } from "@/interfaces/roomfiding.interface"
import ListingCard from "@/components/Card/ListingCard"
import HeroSlide from "@/container/HeroSlide"
import usePath from "@/hooks/usePath"

interface IRoomList {
    rooms?: IRoomFinding[]
    isLoading: boolean
    isFetching: boolean
    isFetchingWhenBack?: boolean
    isFull?: boolean
    handleLoadMore?: () => void
}

const RoomList = ({ rooms, isLoading, isFetching, isFetchingWhenBack, isFull = true, handleLoadMore }: IRoomList) => {
    const { isIndex } = usePath()

    return (
        <div className="flex h-full flex-col">
            {isIndex && <HeroSlide />}
            <div id="room-list" className="my-6 grow">
                {isLoading || isFetchingWhenBack ? (
                    <div className="mx-auto mt-4 max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {Array.from({ length: 12 }).map((_, index) => (
                                <div style={{ width: "100%" }} key={index}>
                                    <Skeleton.Image className="!aspect-square !h-auto !w-full" active />
                                    <Skeleton active style={{ marginTop: "10px" }} />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mx-auto max-w-[2520px] px-4 sm:px-6 md:px-10 xl:px-28">
                            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {rooms?.map((dataRoom: IRoomFinding, index) => (
                                    <ListingCard key={dataRoom.id + index} dataRoom={dataRoom} />
                                ))}
                                {isFetching && (
                                    <>
                                        {Array.from({ length: 10 }).map((_, index) => (
                                            <div style={{ width: "100%" }} key={index}>
                                                <Skeleton.Image className="!aspect-square !h-auto !w-full" active />
                                                <Skeleton
                                                    active
                                                    paragraph={{ rows: 2 }}
                                                    style={{ marginTop: "10px" }}
                                                />
                                            </div>
                                        ))}
                                    </>
                                )}
                            </div>
                        </div>

                        {!isFull ? (
                            <Button
                                loading={isFetching}
                                onClick={handleLoadMore}
                                className="mx-auto my-8 flex h-10 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-white hover:text-white hover:shadow-md hover:shadow-primary/80"
                            >
                                Load more
                            </Button>
                        ) : (
                            <p className="mx-auto my-8 flex h-10 items-center justify-center text-lg font-bold">
                                All rooms loaded.
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default RoomList
