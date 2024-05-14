import TableAntd from "@/components/Table"
import { ROLE, TRANSACTION_STATUS, TRANSACTION_TYPE_COLOR } from "@/utils/constants/GlobalConst"
import { ColumnsType } from "antd/es/table"
import { AlignType } from "rc-table/lib/interface"
import { useAppSelector } from "@/redux/hook"
import { IRentals } from "@/interfaces/rentals.interface"
import useAuth from "@/hooks/useAuth"
import { ITransactions } from "@/interfaces/transaction.interface"
import { useGetTransactionsQuery } from "@/redux/services/transactions/transaction.service"
import { Badge, Spin } from "antd"
import { convertDate } from "@/utils/helpers"

const TableManageTransactions = () => {
    const keyword = useAppSelector((state) => state.search.keyword)
    const { data, isLoading } = useGetTransactionsQuery(keyword)
    const transactions = data as ITransactions[]

    const { role } = useAuth()

    let columns: ColumnsType<IRentals> = [
        {
            title: <span className=" font-bold">Index</span>,
            align: "center" as AlignType,
            key: "index",
            width: "6%",
            render: (_, __, index) => <span className=" text-sm">{index + 1}</span>
        },
        {
            title: <span className="font-bold">Renter name</span>,
            key: "renterName",
            width: "8%",
            render: (record: ITransactions) => (
                <div className="flex items-center">
                    <span className="ml-2 text-sm">{record.renterName ? record.renterName : "--N/A--"}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Description</span>,
            key: "description",
            width: "16%",
            render: (record: ITransactions) => (
                <div className="flex items-center">
                    <span className="ml-2 text-sm">{record.description}</span>
                </div>
            )
        },
        {
            title: <span className="font-bold">Stripe ID</span>,
            key: "stripeId",
            width: "8%",
            render: (record: ITransactions) => (
                <div className="ml-2 flex items-center">
                    {record.stripe_id ? (
                        <span className="text-sm">{record.stripe_id}</span>
                    ) : (
                        <span className="italic text-gray-300">N/A</span>
                    )}
                </div>
            )
        },
        {
            title: <span className="font-bold">Payment ID</span>,
            key: "paymentId",
            width: "8%",
            render: (record: ITransactions) => (
                <div className="ml-2 flex items-center">
                    {record.payment_id ? (
                        <span className="text-sm">{record.payment_id}</span>
                    ) : (
                        <span className="italic text-gray-300">N/A</span>
                    )}
                </div>
            )
        },
        {
            title: <span className="font-bold">Rental ID</span>,
            key: "rentalId",
            width: "8%",
            render: (record: ITransactions) => (
                <div className="ml-2 flex items-center">
                    {record.rental_id ? (
                        <span className="text-sm">{record.rental_id}</span>
                    ) : (
                        <span className="italic text-gray-300">N/A</span>
                    )}
                </div>
            )
        },
        {
            title: <span className="font-bold">Status</span>,
            key: "status",
            width: "8%",
            filters: [
                { text: "Created", value: TRANSACTION_STATUS.CREATED },
                { text: "Deposited", value: TRANSACTION_STATUS.DEPOSITED },
                { text: "Failed", value: TRANSACTION_STATUS.FAILED },
                { text: "Paid", value: TRANSACTION_STATUS.PAID },
                { text: "Payout", value: TRANSACTION_STATUS.PAYOUT }
            ],
            onFilter: (value, record) => record.status === value,
            render: (record: ITransactions) => (
                <Badge
                    color={TRANSACTION_TYPE_COLOR[record.status as TRANSACTION_STATUS]}
                    className="flex items-center text-xs font-medium"
                    text={record.status}
                ></Badge>
            )
        },
        {
            title: <span className="font-bold">Created at</span>,
            key: "createdAt",
            width: "10%",
            render: (record: ITransactions) => (
                <div className="flex items-center">
                    <span className="ml-2 text-sm">{convertDate(record.created_at)}</span>
                </div>
            )
        }
    ]

    if (role === ROLE.MOD) {
        columns = columns.filter((column) => column.key !== "host")
    }

    return (
        <Spin spinning={isLoading}>
            <TableAntd dataSource={transactions} columns={columns} rowKey={(record) => record.id} />
        </Spin>
    )
}

export default TableManageTransactions
