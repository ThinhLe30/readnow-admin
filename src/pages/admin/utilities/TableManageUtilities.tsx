import { IUtiltity } from "@/interfaces/utility.interface"
import { useAppSelector } from "@/redux/hook"
import { useMenuActions } from "../utilities/hooks/useMenuActions"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { Dropdown, Space, Spin } from "antd"
import TableAntd from "@/components/Table"
import { FaEllipsis } from "react-icons/fa6"
import { useGetUtilitiesQuery } from "@/redux/services/utilities/utilities.service"

const TableManageUtilities = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetUtilitiesQuery(keyword)
    const utilities = data as IUtiltity[]
    const getMenuActions = useMenuActions()

    const columns: ColumnsType<IUtiltity> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            dataIndex: "id",
            key: "id",
            width: "8%",
            render: (_, __, index) => <span className=" text-sm font-semibold">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Name</span>,
            key: "name",
            width: "30%",
            render: (record: IUtiltity) => (
                <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={record?.icon} alt={record?.name} />
                    <span className="ml-2 text-sm font-semibold">{record?.name}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Note</span>,
            key: "note",
            width: "50%",
            render: (record: IUtiltity) => <span className=" text-sm font-semibold">{record.note}</span>
        },
        {
            title: <span className="text-center font-bold">Action</span>,
            key: "action",
            width: "10%",
            align: "center" as AlignType,
            render: (record: IUtiltity) => {
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
    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={utilities} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageUtilities
