import { IRentals } from "@/interfaces/rentals.interface"
import { RENTAL_STATUS_COLORS, RENTAL_STATUS, RENTAL_STATUS_TEXT, RATING_STATUS } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"
import { formatPrice } from "@/utils/helpers"
import { FaCheck } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

interface IRentalCard {
    myRental: IRentals
}

const MyRentalCard = (props: IRentalCard) => {
    const myRental = props?.myRental

    const { rentalInfo, roomInfo, status } = myRental

    const ratingStauts = rentalInfo?.ratingStatus
    const isRated = ratingStauts === RATING_STATUS.RATED

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${SITE_MAP.MY_RENTAL}/${rentalInfo.id}`)
    }

    const getActionRental = () => {
        switch (status) {
            case RENTAL_STATUS.CREATED:
                return <span className="py-1.5 text-sm text-gray-400">Waiting host for approval</span>
            case RENTAL_STATUS.APPROVED:
                return (
                    <button className="ml-auto w-fit rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                        Confirm
                    </button>
                )
            case RENTAL_STATUS.COMPLETED:
                return (
                    <div className="flex w-full items-center justify-between">
                        {isRated ? (
                            <span className="flex items-center gap-2 font-medium">
                                <FaCheck className="h-3 w-3 fill-green-500" />
                                Reviewed
                            </span>
                        ) : null}
                        <button className="ml-auto w-fit rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                            Request break
                        </button>
                    </div>
                )
            case RENTAL_STATUS.REQUEST_BREAK:
                return <span className="py-1.5 text-sm text-gray-400">Waiting host for accepting break</span>
            case RENTAL_STATUS.CANCELED:
                return <span className="py-1.5 text-sm text-gray-400">Booking canceled</span>
            case RENTAL_STATUS.BROKEN:
                return <span className="py-1.5 text-sm text-gray-400">Your reservation has broken</span>
            case RENTAL_STATUS.ENDED:
                return <span className="py-1.5 text-sm text-gray-400">Your reservation has ended</span>
            default:
                return null
        }
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md">
            <div className="aspect-[5/3] h-auto w-full overflow-hidden">
                <img
                    onClick={handleClick}
                    src={roomInfo.images[0]}
                    alt="Room image"
                    className="aspect-[5/3] h-auto w-full cursor-pointer transition-all duration-200 hover:scale-110"
                />
            </div>
            <div className="px-4 py-2">
                <div className="flex items-center justify-between">
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium uppercase text-secondary">
                        {roomInfo.roomName}
                    </span>

                    <span
                        className="ml-1 break-keep text-xs font-bold uppercase"
                        style={{ color: RENTAL_STATUS_COLORS[status as RENTAL_STATUS] }}
                    >
                        {RENTAL_STATUS_TEXT[status as RENTAL_STATUS]}
                    </span>
                </div>
                <div className="my-4 grid grid-cols-2 justify-between gap-y-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Move in date: </p>
                        <span className="text-sm">{rentalInfo.moveInDate}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Monthly rent: </p>
                        <span className="text-sm">{formatPrice(roomInfo.price)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Lease term: </p>
                        <span className="text-sm">{rentalInfo.leaseTerm} months</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Deposit amount: </p>
                        <span className="text-sm">{formatPrice(rentalInfo.leaseTerminationCost)}</span>
                    </div>
                </div>
                <hr className="border border-b-gray-50" />
                <div onClick={handleClick} className="mb-1 mt-2 flex h-full cursor-pointer items-center justify-end">
                    {getActionRental()}
                </div>
            </div>
        </div>
    )
}

export default MyRentalCard
