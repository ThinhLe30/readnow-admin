import { AverageRating } from "../../rating"
import Button from "../../components/Button"
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai"
import { useParams } from "react-router-dom"
import { useGetRoomDetailQuery } from "@/redux/services/room-detail/room-detail.service"
import { IRoomDetail } from "@/interfaces/room-detail.interface"
import { ILandlord } from "@/interfaces/user.interface"
import { Skeleton, Spin } from "antd"
import { formatPrice } from "@/utils/helpers"

const Contract = () => {
    const { id } = useParams()
    const { data, isLoading } = useGetRoomDetailQuery({ id })

    const roomDetail = data?.data || ({} as IRoomDetail)

    const { price, images = [], utilities = [], landlord = {} as ILandlord } = roomDetail

    const handleCallHost = () => {
        window.location.href = `tel:${landlord.phoneNumber}`
    }

    return (
        <Spin className="mb-8" spinning={isLoading}>
            <div className="h-fit w-[25rem] rounded-lg border border-gray-200 px-6 py-4 shadow-lg">
                {!isLoading ? (
                    <>
                        <div className="flex justify-between">
                            <span className="text-xs">
                                <b className="text-base font-bold">{formatPrice(price)}</b> /month
                            </span>
                            <AverageRating size="small" />
                        </div>
                        <div className="mt-4 flex h-32 items-center gap-4">
                            <img src={images[0]} className="h-full w-40 rounded-xl object-cover" alt="Room image" />

                            <div className="flex flex-col items-start">
                                <span className="mb-1 text-xs font-bold">Utilities</span>
                                <div className="flex items-center gap-2">
                                    {utilities.map((utility) => (
                                        <img key={utility.id} className="h-4 w-4" src={utility.icon} />
                                    ))}
                                </div>

                                <span className="mb-1 mt-1 text-xs font-bold">Host Information</span>
                                <div className="flex items-center gap-4">
                                    <img src={landlord.photo} className="h-10 w-10 rounded-full" />

                                    <div className="flex flex-col text-xs">
                                        <span className="font-medium">{landlord.name}</span>
                                        <span className="text-gray-500">{landlord.phoneNumber}</span>
                                        <a
                                            className="flex items-center gap-1 text-gray-500 transition duration-150 hover:text-primary hover:underline"
                                            href={`mailto:${landlord.email}`}
                                        >
                                            Mail <AiOutlineMail />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Button
                            onClick={handleCallHost}
                            className="ml-auto mt-4 w-fit rounded-lg bg-primary px-4 py-1 text-sm text-white"
                        >
                            Contact host <AiOutlinePhone />
                        </Button>
                    </>
                ) : (
                    <>
                        <br />
                        <Skeleton active paragraph={{ rows: 0 }} />
                        <div className="flex gap-4">
                            <Skeleton.Image style={{ width: "8rem", height: "6rem" }} active />
                            <div className="flex items-center gap-4">
                                <Skeleton.Avatar active />
                                <Skeleton className="w-60" active paragraph={{ rows: 1 }} />
                            </div>
                        </div>
                        <br />
                        <Skeleton active paragraph={{ rows: 0 }} />
                    </>
                )}
            </div>
        </Spin>
    )
}

export default Contract
