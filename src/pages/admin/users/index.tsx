import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalUser from "./modal"
import TableManageUsers from "./TableManageUsers"
import { PAGE } from "@/utils/constants/GlobalConst"

const Users = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalUser />
            <PageHeader title="Users Management" />
            <TableToolbar type={PAGE.USER} />
            <TableManageUsers />
        </div>
    )
}

export default Users
