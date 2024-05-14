import TableToolbar from "@/container/Toolbar"
import TableManageRentals from "./TableManageRentals"
import PageHeader from "@/container/PageHeader"
import { PAGE } from "@/utils/constants/GlobalConst"
import ModalRental from "./modal"

const Rentals = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalRental />
            <PageHeader title="Rentals Management" />
            <TableToolbar type={PAGE.RENTAL} />
            <TableManageRentals />
        </div>
    )
}

export default Rentals
