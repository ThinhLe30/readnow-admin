import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { Badge, Descriptions } from "antd"
import "./style.css"
import { PAYMENT_STATUS_COLORS, PAYMENT_STATUS_TEXT, PaymentStatusType } from "@/utils/constants/GlobalConst"
import { IPayments } from "@/interfaces/payments.interface"
import { formatPrice } from "@/utils/helpers"

const ModalView = (props: IModal) => {
    const { title, data } = props

    const {
        status,
        id,
        electricNumber,
        waterNumber,
        totalElectricPrice,
        totalWaterPrice,
        additionalPrice,
        totalPrice,
        expirationDate,
        month,
        year,
        paidAt,
        rental
    } = data as IPayments

    return (
        <div className="flex flex-col items-center">
            <Title>{title}</Title>
            <h2 className="mb-4 text-lg font-bold">Payment Information</h2>
            <Descriptions column={1}>
                <Descriptions.Item label="Status">
                    <Badge
                        className="flex items-center text-xs font-medium"
                        color={PAYMENT_STATUS_COLORS[status as PaymentStatusType]}
                        text={PAYMENT_STATUS_TEXT[status as PaymentStatusType]}
                    ></Badge>
                </Descriptions.Item>
                <Descriptions.Item label="Payment ID">{id}</Descriptions.Item>
                <Descriptions.Item label="Payment time">{month + "/" + year}</Descriptions.Item>
                <Descriptions.Item label="Electric number">{electricNumber}</Descriptions.Item>
                <Descriptions.Item label="Total electric price">{formatPrice(totalElectricPrice)}</Descriptions.Item>
                <Descriptions.Item label="Water number">{waterNumber}</Descriptions.Item>
                <Descriptions.Item label="Total water price">{formatPrice(totalWaterPrice)}</Descriptions.Item>
                <Descriptions.Item label="Additional price">{formatPrice(additionalPrice)}</Descriptions.Item>
                <Descriptions.Item label="Total price">{formatPrice(totalPrice)}</Descriptions.Item>
                <Descriptions.Item label="Expiration date">
                    {expirationDate ? expirationDate : "-----"}
                </Descriptions.Item>
                <Descriptions.Item label="Paid at">{paidAt ? paidAt : "-----"}</Descriptions.Item>
            </Descriptions>
            <h2 className="mb-4 text-lg font-bold">Host Information</h2>
            <Descriptions column={1}>
                <Descriptions.Item label="Id">{rental.hostInfo.id}</Descriptions.Item>
                <Descriptions.Item label="First Name">{rental.hostInfo.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{rental.hostInfo.lastName}</Descriptions.Item>
                <Descriptions.Item label="Email">{rental.hostInfo.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{rental.hostInfo.phone}</Descriptions.Item>
                <Descriptions.Item label="Identity number">{rental.hostInfo.identityNumber}</Descriptions.Item>
            </Descriptions>
            <h2 className="mb-4 text-lg font-bold">Renter Information</h2>
            <Descriptions column={1}>
                <Descriptions.Item label="Id">{rental.renterInfo.id}</Descriptions.Item>
                <Descriptions.Item label="Identity number">{rental.renterInfo.identityNumber}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ModalView
