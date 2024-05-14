import TableToolbar from "@/container/Toolbar"
import PageHeader from "@/container/PageHeader"
import ModalBlocks from "./modal"
import { PAGE } from "@/utils/constants/GlobalConst"
import TableManageRoomBlocks from "./TableManageRoomBlocks"

const Blocks = () => {
    return (
        <div className="flex-1 px-6 py-4">
            <ModalBlocks />
            <PageHeader title="Room Blocks Management" />
            <TableToolbar type={PAGE.BLOCK} />
            <TableManageRoomBlocks />
        </div>
    )
}

export default Blocks
