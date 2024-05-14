import { IRoomBlock } from "@/interfaces/block.interface"
import { useGetRoomBlocksQuery } from "@/redux/services/block/block.service"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import { Dropdown, Space, Spin } from "antd"
import { useMenuActions } from "./hooks/useMenuActions"
import { useAppSelector } from "@/redux/hook"
import { ROLE } from "@/utils/constants/GlobalConst"
import { convertDate } from "@/utils/helpers"

const TableManageRoomBlocks = () => {
    const role = useAppSelector((state) => state.auth.userInfo!.role)
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetRoomBlocksQuery({ role, keyword: keyword })
    const roomBlocks = data?.data.roomBlocks as IRoomBlock[]

    const getMenuActions = useMenuActions()

    let columns: ColumnsType<IRoomBlock> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "6%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Landlord</span>,
            key: "name",
            width: "18%",
            render: (record: IRoomBlock) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record.landlord?.photo} alt={record.landlord?.name} />
                    <span className="ml-2 text-sm font-semibold">{record.landlord?.name}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Address</span>,
            key: "address",
            dataIndex: "address",
            width: "12%",
            render: (address: string) => <span className="text-sm font-medium">{address}</span>
        },
        {
            title: <span className="font-bold">Quantity Room</span>,
            key: "quantityRooms",
            dataIndex: "quantityRooms",
            width: "10%",
            align: "center" as AlignType,
            render: (quantityRooms: number) => <span className="text-sm font-medium">{quantityRooms}</span>
        },
        {
            title: <span className="font-bold">Empty Room</span>,
            key: "emptyRooms",
            dataIndex: "emptyRooms",
            width: "10%",
            align: "center" as AlignType,
            render: (emptyRooms: number) => <span className="text-sm font-medium">{emptyRooms}</span>
        },
        {
            title: <span className="font-bold">Delete at</span>,
            key: "deletedAt",
            dataIndex: "deletedAt",
            width: "6%",
            align: "center" as AlignType,
            render: (deletedAt: string) => (
                <span className="text-sm text-gray-400">{deletedAt !== null ? convertDate(deletedAt) : "-----"}</span>
            )
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "6%",
            align: "center" as AlignType,
            render: (record: IRoomBlock) => {
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
        columns = columns.filter((column) => column.key !== "name")
    }

    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={roomBlocks} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageRoomBlocks
