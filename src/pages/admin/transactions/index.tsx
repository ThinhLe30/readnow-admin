import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import { PAGE } from "@/utils/constants/GlobalConst"
import TableManageTransactions from "./TableManageTransactions"

const Transactions = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <PageHeader title="Transaction Management" />
            <TableToolbar type={PAGE.TRANSACTION} />
            <TableManageTransactions />
        </div>
    )
}

export default Transactions
