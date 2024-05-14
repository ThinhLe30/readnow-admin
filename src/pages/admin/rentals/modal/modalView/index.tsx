import Title from "@/components/Modal/Title"
import { IModal } from "@/interfaces/modal.interface"
import { Badge, Descriptions, Image } from "antd"
import "./style.css"
import { formatStatus } from "@/utils/helpers"
import { RENTAL_STATUS_COLORS, RentalStatusType } from "@/utils/constants/GlobalConst"
import { IRentals } from "@/interfaces/rentals.interface"

const ModalView = (props: IModal) => {
    const { title, data } = props

    const { rentalInfo, renterInfo, roomInfo, roomBlockInfo, status } = data as IRentals

    return (
        <div className="flex flex-col items-center">
            <Title>{title}</Title>
            <h2 className="mb-4 text-lg font-bold">Rental Information</h2>
            <Descriptions column={1}>
                <Descriptions.Item label="Status">
                    <Badge
                        color={RENTAL_STATUS_COLORS[status as RentalStatusType]}
                        className="flex items-center text-xs font-medium"
                        text={formatStatus(status)}
                    ></Badge>
                </Descriptions.Item>
                <Descriptions.Item label="Lease term">{rentalInfo.leaseTerm}</Descriptions.Item>
                <Descriptions.Item label="Move in date">{rentalInfo.moveInDate}</Descriptions.Item>
                <Descriptions.Item label="Move out date">{rentalInfo.moveOutDate}</Descriptions.Item>
                <Descriptions.Item label="Number of tenants">{rentalInfo.numberOfTenants}</Descriptions.Item>
                <Descriptions.Item label="Electric Price">{rentalInfo.electricPrice}</Descriptions.Item>
                <Descriptions.Item label="Water Price">{rentalInfo.waterPrice}</Descriptions.Item>
                <Descriptions.Item label="Additional Price">{rentalInfo.additionalPrice}</Descriptions.Item>
                <Descriptions.Item label="Lease termination cost">{rentalInfo.leaseTerminationCost}</Descriptions.Item>
            </Descriptions>
            <h2 className="mb-4 text-lg font-bold">Renter information</h2>
            <Image width={80} height={80} className="rounded-full" src={rentalInfo.photo} />
            <Descriptions column={1} className="mt-4">
                <Descriptions.Item label="First Name">{renterInfo.firstName}</Descriptions.Item>
                <Descriptions.Item label="Last Name">{renterInfo.lastName}</Descriptions.Item>
                <Descriptions.Item label="Email">{renterInfo.email}</Descriptions.Item>
                <Descriptions.Item label="Phone Number">{renterInfo.phone}</Descriptions.Item>
                <Descriptions.Item label="Birthday">{renterInfo.birthday}</Descriptions.Item>
                <Descriptions.Item label="Identity number">{renterInfo.identityNumber}</Descriptions.Item>
                <Descriptions.Item label="Identity date of issue">{renterInfo.identityDateOfIssue}</Descriptions.Item>
                <Descriptions.Item label="Identity place of issue">{renterInfo.identityPlaceOfIssue}</Descriptions.Item>
            </Descriptions>
            <h2 className="mb-4 text-lg font-bold">Room information</h2>
            <Descriptions column={1}>
                <Descriptions.Item label="Room block">{roomBlockInfo.address}</Descriptions.Item>
                <Descriptions.Item label="Room">{roomInfo.roomName}</Descriptions.Item>
            </Descriptions>
        </div>
    )
}

export default ModalView
