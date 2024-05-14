import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai"
import { formatPrice } from "@/utils/helpers"
import Button from "@/pages/home/room-detail/components/Button"
import { AverageRating } from "@/pages/home/room-detail/rating"
import { IHostInfo, IRentalInfo, IRoomInfo } from "@/interfaces/rentals.interface"
import { Skeleton } from "antd"
import { useAppDispatch } from "@/redux/hook"
import { MODAL } from "@/utils/constants/GlobalConst"
import { openModal } from "@/redux/features/modal/modal.slice"
import { SITE_MAP } from "@/utils/constants/Path"
import { useNavigate } from "react-router-dom"

interface IContractProps {
    hostInfo?: IHostInfo
    roomInfo?: IRoomInfo
    rentalInfo?: IRentalInfo
    isComplete?: boolean
}

const Contract = (props: IContractProps) => {
    const { price, images = [], utilities = [], id } = props?.roomInfo || {}

    const landlord = props?.hostInfo

    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const handleClick = () => {
        if (props?.isComplete) {
            dispatch(openModal({ type: MODAL.REVIEW.RENTAL }))
        } else {
            window.location.href = `tel:${landlord?.phone}`
        }
    }

    const isLoading = !props?.hostInfo || !props?.roomInfo

    return (
        <div className="h-fit w-[25rem] rounded-lg border border-gray-200 px-6 py-4 shadow-lg">
            {!isLoading ? (
                <>
                    <div className="flex justify-between">
                        <span className="text-xs">
                            <b className="text-base font-bold">{formatPrice(price)}</b> VND/month
                        </span>
                        <AverageRating size="small" />
                    </div>
                    <div className="mt-4 flex h-32 items-center gap-4">
                        <img
                            onClick={() => navigate(`/${SITE_MAP.ROOM}/${id}`)}
                            src={images[0]}
                            className="h-full w-40 cursor-pointer rounded-xl object-cover"
                            alt="Room image"
                        />

                        <div className="flex flex-col items-start">
                            <span className="mb-1 text-xs font-bold">Utilities</span>
                            <div className="flex items-center gap-2">
                                {utilities.map((utility) => (
                                    <img key={utility.id} className="h-4 w-4" src={utility.icon} />
                                ))}
                            </div>

                            <span className="mb-1 mt-1 text-xs font-bold">Host Information</span>
                            <div className="flex items-center gap-4">
                                <img src={landlord?.photo} className="h-10 w-10 rounded-full" />

                                <div className="flex flex-col text-xs">
                                    <span className="font-medium">{landlord?.firstName}</span>
                                    <span className="text-gray-500">{landlord?.phone}</span>
                                    <a
                                        className="flex items-center gap-1 text-gray-500 transition duration-150 hover:text-primary hover:underline"
                                        href={`mailto:${landlord?.email}`}
                                    >
                                        Mail <AiOutlineMail />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-4 flex items-center justify-end">
                        <Button
                            onClick={handleClick}
                            className="w-fit rounded-lg bg-primary px-4 py-1 text-sm text-white transition duration-100 hover:shadow hover:shadow-primary"
                        >
                            Contact host <AiOutlinePhone />
                        </Button>
                    </div>
                </>
            ) : (
                <>
                    <br />
                    <Skeleton active paragraph={{ rows: 0 }} />
                    <div className="flex gap-4">
                        <Skeleton.Image style={{ width: "8rem", height: "6rem" }} active />
                        <div className="flex items-center gap-4">
                            <Skeleton.Avatar active />
                            <Skeleton className="w-40" active paragraph={{ rows: 2 }} />
                        </div>
                    </div>
                    <br />
                    <div className="mb-1 flex h-full items-center justify-end">
                        <Skeleton.Button style={{ width: "80px" }} active />
                    </div>
                </>
            )}
        </div>
    )
}

export default Contract
