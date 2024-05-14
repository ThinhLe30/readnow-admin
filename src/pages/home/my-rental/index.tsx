import { useGetMyRentalsQuery } from "@/redux/services/rentals/rentals.service"
import MyRentalCard from "./card"
import { IRentals } from "@/interfaces/rentals.interface"
import { Empty, Skeleton, Tabs, TabsProps } from "antd"
import { useState } from "react"
import { RENTAL_STATUS } from "@/utils/constants/GlobalConst"

const MyRental = () => {
    const { data, isLoading, isFetching } = useGetMyRentalsQuery(undefined, { refetchOnMountOrArgChange: true })
    const [filter, setFilter] = useState<
        | RENTAL_STATUS.CREATED
        | RENTAL_STATUS.APPROVED
        | RENTAL_STATUS.COMPLETED
        | RENTAL_STATUS.CANCELED
        | RENTAL_STATUS.REQUEST_BREAK
        | RENTAL_STATUS.BROKEN
        | RENTAL_STATUS.ENDED
    >(RENTAL_STATUS.CREATED)

    const myRentals = data?.data
    if (myRentals?.length === 0 && !isLoading && !isFetching)
        return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description="No rentals in list." className="mt-24" />

    const filteredRentals = myRentals?.filter((rental) => {
        switch (filter) {
            case RENTAL_STATUS.CREATED:
                return rental.status === RENTAL_STATUS.CREATED
            case RENTAL_STATUS.APPROVED:
                return rental.status === RENTAL_STATUS.APPROVED
            case RENTAL_STATUS.COMPLETED:
                return rental.status === RENTAL_STATUS.COMPLETED
            case RENTAL_STATUS.CANCELED:
                return rental.status === RENTAL_STATUS.CANCELED
            case RENTAL_STATUS.REQUEST_BREAK:
                return rental.status === RENTAL_STATUS.REQUEST_BREAK
            case RENTAL_STATUS.BROKEN:
                return rental.status === RENTAL_STATUS.BROKEN
            case RENTAL_STATUS.ENDED:
                return rental.status === RENTAL_STATUS.ENDED
        }
    })

    const items: TabsProps["items"] = [
        {
            key: RENTAL_STATUS.CREATED,
            label: "Created"
        },
        {
            key: RENTAL_STATUS.APPROVED,
            label: "Approved"
        },
        {
            key: RENTAL_STATUS.COMPLETED,
            label: "Completed"
        },
        {
            key: RENTAL_STATUS.CANCELED,
            label: "Canceled"
        },
        {
            key: RENTAL_STATUS.REQUEST_BREAK,
            label: "Request Break"
        },
        {
            key: RENTAL_STATUS.BROKEN,
            label: "Broken"
        },
        {
            key: RENTAL_STATUS.ENDED,
            label: "Ended"
        }
    ]

    const onChange = (key: string) => {
        setFilter(key as RENTAL_STATUS)
    }

    return (
        <div className="mb-8 mt-4 px-4 sm:px-6 md:px-10 xl:px-28">
            <h1 className="mb-2 text-2xl font-bold text-secondary">My Rental</h1>
            {isLoading || isFetching ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <div key={index} className="w-full overflow-hidden rounded-xl border border-gray-200 shadow-md">
                            <Skeleton.Image className="aspect-[5/3] !h-auto !w-full" />

                            <div className="px-4 py-2">
                                <Skeleton active style={{ marginTop: "10px", width: "100%" }} />

                                <hr className="my-2 border border-b-gray-50" />

                                <div className="mb-1 flex h-full items-center justify-end">
                                    <Skeleton.Button style={{ width: "80px" }} active />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <>
                    <Tabs
                        defaultActiveKey={RENTAL_STATUS.CREATED}
                        defaultValue={RENTAL_STATUS.CREATED}
                        items={items}
                        onChange={onChange}
                    />
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredRentals?.map((item: IRentals) => (
                            <MyRentalCard key={item.rentalInfo.id} myRental={item} />
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}

export default MyRental
