import { IPayments } from "@/interfaces/payments.interface"
import { PAYMENT_STATUS } from "@/utils/constants/GlobalConst"
import { SITE_MAP } from "@/utils/constants/Path"
import { formatPrice } from "@/utils/helpers"
import { MdOutlinePayment } from "react-icons/md"
import { useNavigate } from "react-router-dom"

interface IPaymentCard {
    myPayment: IPayments
}

const MyPaymentCard = (props: IPaymentCard) => {
    const myPayment = props?.myPayment

    const { id, rental, status, expirationDate, totalPrice, totalWaterPrice, totalElectricPrice, month, year } =
        myPayment

    const { roomInfo } = rental

    const paymentTime = month.toString() + "/" + year.toString()

    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/${SITE_MAP.MY_PAYMENT}/${id}`)
    }

    const getActionPayment = () => {
        switch (status) {
            case PAYMENT_STATUS.PAID:
                return <span className="py-1.5 text-sm text-gray-400">Paid!</span>
            case PAYMENT_STATUS.UNPAID:
                return (
                    <button className="ml-auto flex w-fit items-center gap-2 rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-white hover:shadow-md hover:shadow-primary">
                        Payment <MdOutlinePayment className="w-4" />
                    </button>
                )
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
                    <span className="overflow-hidden text-ellipsis whitespace-nowrap rounded-md text-sm font-medium uppercase text-secondary">
                        {roomInfo.roomName}
                    </span>
                    <span className="ml-1 break-keep rounded-md bg-secondary px-2 py-0.5 text-xs font-bold text-white">
                        {paymentTime}
                    </span>
                </div>
                <div className="my-4 grid grid-cols-2 justify-between gap-y-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Water price: </p>
                        <span className="text-sm">{formatPrice(totalWaterPrice)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Electric price: </p>
                        <span className="text-sm">{formatPrice(totalElectricPrice)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Total price: </p>
                        <span className="text-sm">{formatPrice(totalPrice)}</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="text-sm font-medium text-secondary">Expiration date: </p>
                        <span className="text-sm">{expirationDate}</span>
                    </div>
                </div>
                <hr className="border border-b-gray-50" />
                <div onClick={handleClick} className="mb-1 mt-2 flex h-full cursor-pointer items-center justify-end">
                    {getActionPayment()}
                </div>
            </div>
        </div>
    )
}

export default MyPaymentCard
