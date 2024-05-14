import TableToolbar from "@/container/Toolbar"
import TableManagePayments from "./TableManagePayments"
import PageHeader from "@/container/PageHeader"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalPayment from "./modal"

const Payments = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalPayment />
            <PageHeader title="Payments Management" />
            <TableToolbar type={PAGE.PAYMENT} />
            <TableManagePayments />
        </div>
    )
}

export default Payments
