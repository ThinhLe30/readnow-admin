import TableAntd from "@/components/Table"
import { ROLE, PAYMENT_STATUS, PAYMENT_STATUS_COLORS, PaymentStatusType } from "@/utils/constants/GlobalConst"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space, Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { IRentals } from "@/interfaces/rentals.interface"
import useAuth from "@/hooks/useAuth"
import { useGetPaymentsQuery } from "@/redux/services/payments/payments.service"
import { IPayments } from "@/interfaces/payments.interface"
import { formatPrice } from "@/utils/helpers"

const TableManagePayments = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetPaymentsQuery({ keyword: keyword })
    const payments = data?.data as IPayments[]

    const { role } = useAuth()

    const getMenuActions = useMenuActions()

    let columns: ColumnsType<IRentals> = [
        {
            title: <span className="font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "5%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Rental ID</span>,
            key: "rentalId",
            width: "8%",
            render: (record: IPayments) => (
                <span className="ml-2 text-sm font-semibold">{record.rental.renterInfo?.id}</span>
            )
        },
        {
            title: <span className="font-bold">Host</span>,
            key: "hostInfo",
            width: "10%",
            render: (record: IPayments) => (
                <div className="flex items-center">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={record.rental.hostInfo.photo}
                        alt={record.rental.hostInfo.firstName}
                    />
                    <span className="ml-2 text-sm font-semibold">{record.rental.hostInfo.firstName}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Renter ID</span>,
            key: "renterId",
            width: "8%",
            render: (record: IPayments) => (
                <span className="ml-2 text-sm font-semibold">{record.rental.renterInfo.id}</span>
            )
        },
        {
            title: <span className="font-bold">Time</span>,
            key: "paymentTime",
            width: "8%",
            render: (record: IPayments) => <span className="ml-2 text-sm">{record.month + "/" + record.year}</span>
        },
        {
            title: <span className="font-bold">Total price</span>,
            key: "roomName",
            width: "8%",
            render: (record: IPayments) => <span className="ml-2 text-sm">{formatPrice(record.totalPrice)}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            width: "8%",
            filters: [
                { text: "Paid", value: PAYMENT_STATUS.PAID },
                { text: "Unpaid", value: PAYMENT_STATUS.UNPAID }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: IPayments) => (
                <Badge
                    color={PAYMENT_STATUS_COLORS[record.status as PaymentStatusType]}
                    className=" ml-2 flex items-center text-xs font-medium"
                    text={record.status}
                ></Badge>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IPayments) => {
                const menuActions = getMenuActions(record)

                return (
                    <Dropdown menu={{ items: menuActions }} trigger={["click"]} placement="bottomRight" arrow>
                        <Space>
                            <FaEllipsis className="cursor-pointer text-center text-lg" />
                        </Space>
                    </Dropdown>
                )
            }
        }
    ]

    if (role === ROLE.MOD) {
        columns = columns.filter((column) => column.key !== "host")
    }

    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={payments} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManagePayments
