import TableAntd from "@/components/Table"
import { RENTAL_STATUS_COLORS, ROLE, RENTAL_STATUS, RentalStatusType } from "@/utils/constants/GlobalConst"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { FaEllipsis } from "react-icons/fa6"
import { Badge, Dropdown, Space, Spin } from "antd"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "./hooks/useMenuActions"
import { useGetRentalsQuery } from "@/redux/services/rentals/rentals.service"
import { IRentals } from "@/interfaces/rentals.interface"
import useAuth from "@/hooks/useAuth"

const TableManageRentals = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetRentalsQuery({ keyword: keyword })
    const rentals = data?.data as IRentals[]

    const { role } = useAuth()

    const getMenuActions = useMenuActions()

    let columns: ColumnsType<IRentals> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "6%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Renter</span>,
            key: "firstName",
            width: "10%",
            render: (record: IRentals) => (
                <div className="flex items-center">
                    <img
                        className="h-8 w-8 rounded-full"
                        src={record.rentalInfo.photo}
                        alt={record.renterInfo.firstName}
                    />
                    <span className="ml-2 text-sm font-semibold">{record.renterInfo.firstName}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Host</span>,
            key: "host",
            width: "10%",
            render: (record: IRentals) => (
                <span className="ml-2 text-sm font-semibold">{record.hostInfo.firstName}</span>
            )
        },
        {
            title: <span className="font-bold">Move in date</span>,
            key: "moveInDate",
            align: "center" as AlignType,
            width: "10%",
            sorter: (a, b) => {
                const dateA = a.rentalInfo.moveInDate ? new Date(a.rentalInfo.moveInDate) : null
                const dateB = b.rentalInfo.moveInDate ? new Date(b.rentalInfo.moveInDate) : null

                if (dateA && dateB) {
                    return dateA.getTime() - dateB.getTime()
                }

                return 0
            },
            render: (record: IRentals) => <span className="text-sm font-medium">{record.rentalInfo.moveInDate}</span>
        },
        {
            title: <span className="font-bold">Tenants</span>,
            key: "tenants",
            align: "center" as AlignType,
            width: "8%",
            sorter: (a, b) => a.rentalInfo.numberOfTenants - b.rentalInfo.numberOfTenants,
            render: (record: IRentals) => (
                <span className="text-sm font-medium">{record.rentalInfo.numberOfTenants}</span>
            )
        },
        {
            title: <span className="font-bold">Lease term</span>,
            key: "leaseTerm",
            align: "center" as AlignType,
            width: "10%",
            sorter: (a, b) => a.rentalInfo.leaseTerm - b.rentalInfo.leaseTerm,
            render: (record: IRentals) => <span className="text-sm font-medium">{record.rentalInfo.leaseTerm}</span>
        },
        {
            title: <span className="font-bold">Room block address</span>,
            key: "address",
            width: "12%",
            render: (record: IRentals) => <span className="text-sm">{record.roomBlockInfo.address}</span>
        },
        {
            title: <span className="font-bold">Room name</span>,
            key: "roomName",
            width: "10%",
            render: (record: IRentals) => <span className="text-sm">{record.roomInfo.roomName}</span>
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            width: "8%",
            filters: [
                { text: "Created", value: RENTAL_STATUS.CREATED },
                { text: "Approved", value: RENTAL_STATUS.APPROVED },
                { text: "Completed", value: RENTAL_STATUS.COMPLETED },
                { text: "Canceled", value: RENTAL_STATUS.CANCELED },
                { text: "Request Break", value: RENTAL_STATUS.REQUEST_BREAK },
                { text: "Broken", value: RENTAL_STATUS.BROKEN },
                { text: "Ended", value: RENTAL_STATUS.ENDED }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: IRentals) => (
                <Badge
                    color={RENTAL_STATUS_COLORS[record.status as RentalStatusType]}
                    className="flex items-center text-xs font-medium"
                    text={record.status}
                ></Badge>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IRentals) => {
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
            <TableAntd dataSource={rentals} columns={columns} rowKey={(record) => record.rentalInfo.id} />
        </Spin>
    )
}

export default TableManageRentals
